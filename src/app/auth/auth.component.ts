import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, responseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  @ViewChild('f') signupform: NgForm;
  isfetching = false;
  isloggedin = false;
  error = null;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSwitch() {
    this.isloggedin = !this.isloggedin;
  }

  onSubmit() {
    const email = this.signupform.value.email;
    const password = this.signupform.value.password;
    this.isfetching = true;
    let observ: Observable<responseData>;

    if (!this.isloggedin) {
      observ = this.authService.signUp(email, password);
    } else {
      observ = this.authService.login(email, password);
    }

    observ.subscribe(
      (responseData) => {
        console.log(responseData);
        this.isfetching = false;
        this.router.navigate(['/recepies']);
      },
      (error) => {
        this.error = error;
        this.isfetching = false;
      }
    );
  }
}
