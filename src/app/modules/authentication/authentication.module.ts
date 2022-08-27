import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupSuccessComponent } from './components/signup/signup-success/signup-success.component';
import { SignupFormComponent } from './components/signup/signup-form/signup-form.component';


@NgModule({
  declarations: [
    SignupComponent,
    SignupSuccessComponent,
    SignupFormComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
