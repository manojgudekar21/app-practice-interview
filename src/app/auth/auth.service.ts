import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface responseData {
  idToken: string;
  email: string;
  refershToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

  expirationDatedestroier = null
  ngOnInit(): void { }

  signUp(email: string, password: string) {
    return this.http
      .post<responseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxmygdzJ8RG2UImVMWAIY1SKX9uIoGcAI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.HandlingError),
        tap((resdata) => {
          this.AuthenticatedUser(
            resdata.email,
            resdata.localId,
            resdata.idToken,
            +resdata.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<responseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxmygdzJ8RG2UImVMWAIY1SKX9uIoGcAI',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.HandlingError),
        tap((resdata) => {
          this.AuthenticatedUser(
            resdata.email,
            resdata.localId,
            resdata.idToken,
            +resdata.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const authUser: {
      email: string,
      id: string,
      _tokenId: string,
      _expiration: string
    } = JSON.parse(localStorage.getItem('authenticate'))

    if (!authUser) {
      return
    }
    const DbUser = new User(authUser.email, authUser.id, authUser._tokenId, new Date(authUser._expiration))
    if (DbUser.token) {
      this.user.next(DbUser)
      const expiration = new Date(authUser._expiration).getTime() - new Date().getTime()
      this.autoLogout(expiration)
    }
  }

  logout() {
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('authenticate')
    clearTimeout(this.expirationDatedestroier)
  }

  autoLogout(expirationTime: number) {
    this.expirationDatedestroier = setTimeout(() => {
      this.logout()
    }, expirationTime)
  }

  private AuthenticatedUser(
    email: string,
    id: string,
    tokenId: string,
    expiration: number
  ) {
    const Expiration = new Date(new Date().getTime() + expiration * 1000);
    const user = new User(email, id, tokenId, Expiration);
    this.user.next(user);
    console.log(expiration*1000)
    this.autoLogout(expiration * 1000)
    localStorage.setItem('authenticate', JSON.stringify(user))
  }

  private HandlingError(errorRes: HttpErrorResponse) {
    console.log(errorRes);
    let errormessage = '';

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errormessage = 'email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errormessage = 'email not found';
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errormessage = 'email or password is incorrect';
        break;
    }
    return throwError(errormessage);
  }
}
