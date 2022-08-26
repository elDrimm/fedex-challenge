import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from "@env/environment";
import { SignupComponent } from "@modules/authentication/pages/signup/signup.component";

const routes: Routes = [
  {
    path: environment.routes.signup.path,
    component: SignupComponent,
    data: {
      title: environment.routes.signup.title
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
