import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { LoginCredentials } from 'src/app/models/login.model';
import { LoginAction } from 'src/app/state/authenticatio.actions';
import { LoginState } from 'src/app/state/authenticatio.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  @Select(LoginState.loginState)
  loginState$!: Observable<LoginCredentials>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.createFrom();
  }

  createFrom() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    console.log(this.loginForm)
  }


  submit(): void {
    if (this.loginForm.valid) {
      const userName = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      this.store.dispatch(new LoginAction({ userName, password }));
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
