import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './state/authenticatio.state';
import { UsersState } from './state/users-list.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UsersModule,
    AuthenticationModule,
    SharedModule,
    HttpClientModule,
    NgxsModule.forRoot([LoginState, UsersState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
