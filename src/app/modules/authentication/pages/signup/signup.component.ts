import { Component } from '@angular/core';
import { UntilDestroy } from "@ngneat/until-destroy";
import { User } from "@shared/models/user.interface";

@UntilDestroy()
@Component({
  selector: 'fed-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  successfullySent = false;
  user: User | undefined;

  onSuccess(user: User) {
    this.successfullySent = true;
    this.user = user;
  }
}
