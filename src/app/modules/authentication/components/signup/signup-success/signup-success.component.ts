import { Component, Input } from '@angular/core';
import { User } from "@shared/models/user.interface";

@Component({
  selector: 'fed-signup-success',
  templateUrl: './signup-success.component.html',
})
export class SignupSuccessComponent {
  @Input() user: User | undefined;
}
