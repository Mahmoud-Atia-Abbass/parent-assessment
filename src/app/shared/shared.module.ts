import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastComponent } from './toast/toast.component';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    NavigationComponent,
    ToastComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    NavigationComponent,
    ReactiveFormsModule,
    FormsModule,
    ToastComponent,
  ],
  providers: [AuthGuard]
})
export class SharedModule { }
