import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoginState } from './state/authenticatio.state';
import { Observable } from 'rxjs';
import { ToastModel } from './models/toast.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor() { }

  @Select(LoginState.toast)
  toast$!: Observable<ToastModel>;
  toast!: ToastModel;


  ngOnInit(): void {
    this.subscribeToActions();
  }

  subscribeToActions(): void {
    this.toast$.subscribe((response) => {
      if (response) {
        this.toast = response;
      };
    });
  }

}
