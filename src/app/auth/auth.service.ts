import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { catchError, throwError } from "rxjs";

export interface responseData {
  idToken: string,
  email: string,
  refershToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  signUp(email: string, password: string) {
    return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxmygdzJ8RG2UImVMWAIY1SKX9uIoGcAI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.HandlingError))
  }

  login(email: string, password: string) {
    return this.http.post<responseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxmygdzJ8RG2UImVMWAIY1SKX9uIoGcAI',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.HandlingError))
  }

  private HandlingError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errormessage = ''

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errormessage = 'email already exists'
        break;
      case 'EMAIL_NOT_FOUND':
        errormessage = 'email not found'
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errormessage = 'email or password is incorrect'
        break;
    }
    return throwError(errormessage)
  }

}

