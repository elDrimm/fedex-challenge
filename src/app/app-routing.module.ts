import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from "@env/environment";

const routes: Routes = [
  {
    // For now just redirect to the signup page
    path: '',
    redirectTo: environment.routes.signup.path,
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
