import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { SignupForm } from "@modules/authentication/models/signup-form.interface";
import { SignupPasswordValidator } from "@modules/authentication/validators/signup-password.validator";
import { UsersService } from "@core/services/users/users.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "@shared/models/user.interface";

@UntilDestroy()
@Component({
  selector: 'fed-signup-form',
  templateUrl: './signup-form.component.html'
})
export class SignupFormComponent {
  @Output() success = new EventEmitter<User>();

  signupForm = new FormGroup<SignupForm>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])/)
    ])
  }, {
    validators: SignupPasswordValidator.containsUserInfo(),
  });

  isSubmitting = false;
  errorMessage: string | null = null;

  get firstNameCtrl() {
    return this.signupForm.get('firstName');
  }

  get lastNameCtrl() {
    return this.signupForm.get('lastName');
  }

  get emailCtrl() {
    return this.signupForm.get('email');
  }

  get passwordCtrl() {
    return this.signupForm.get('password');
  }

  constructor(
    readonly usersService: UsersService
  ) { }

  onSubmit() {
    if (this.signupForm.valid) {
      this.isSubmitting = true;

      const newUser = this._getUsersRequestBody();
      this.usersService.addUser(newUser)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: res => this._onSubmitSuccess(res),
          error: err => this._onSubmitError(err)
        })
    } else {
      this._formNotValid();
    }
  }

  private _formNotValid() {
    this.signupForm.markAllAsTouched();
  }

  private _getUsersRequestBody(): User {
    const { firstName, lastName, email} = this.signupForm.value;

    return <User>{
      firstName,
      lastName,
      email
    }
  }

  private _onSubmitSuccess(user: User) {
    this.isSubmitting = false;
    this.success.emit(user);
  }

  private _onSubmitError(error: HttpErrorResponse) {
    this.isSubmitting = false;
    this.errorMessage = error.message;
  }

}
