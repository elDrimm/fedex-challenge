import {
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

export class SignupPasswordValidator {
  static containsUserInfo(): ValidatorFn {
    return (formGroup: AbstractControl) => {
      const firstName = formGroup.get('firstName')?.value;
      const lastName = formGroup.get('lastName')?.value;
      const password = formGroup.get('password')?.value;

      if (this._stringContainsWord(password, firstName) || this._stringContainsWord(password, lastName)) {
        return {
          nameIncluded: true
        }
      } else {
        return null
      }
    }
  }

  private static _stringContainsWord(string: string | null, word: string | null): boolean {
    if (!!string && !!word) {
      return string.toLowerCase().includes(word.toLowerCase());
    } else {
      return false;
    }
  }
}
