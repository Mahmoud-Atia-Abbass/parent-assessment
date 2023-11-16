import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
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
  subManager = new Subscription();

  @Select(LoginState.loginToken)
  loginState$!: Observable<LoginCredentials>;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscribeToLoginState();
    this.createFrom();
  }

  createFrom() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  subscribeToLoginState() {
    this.subManager.add(
      this.loginState$.subscribe((response) => {
        if (response) {
          this.router.navigate(['/users']);
        }
      })
    )
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
