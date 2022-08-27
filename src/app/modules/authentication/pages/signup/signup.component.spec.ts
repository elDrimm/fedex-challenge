import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { SignupFormComponent } from "@modules/authentication/components/signup/signup-form/signup-form.component";
import {
  SignupSuccessComponent
} from "@modules/authentication/components/signup/signup-success/signup-success.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { By } from "@angular/platform-browser";
import { User } from "@shared/models/user.interface";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

export const testUser: User = {
  firstName: 'John',
  lastName: 'Dough',
  email: 'john@dough.com'
}

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignupComponent,
        SignupFormComponent,
        SignupSuccessComponent
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On startup', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should show the form', () => {
      const formComponent = fixture.debugElement.query(By.directive(SignupFormComponent));
      expect(formComponent).toBeTruthy();
    });

    it('should not show the success message', () => {
      const successComponent = fixture.debugElement.query(By.directive(SignupSuccessComponent));
      expect(successComponent).toBeFalsy();
    });
  });

  describe('On success', () => {
    it('should set the user on success', () => {
      component.onSuccess(testUser);
      expect(component.user).toEqual(testUser);
    });

    it('should set "successfullySent" to true', () => {
      component.onSuccess(testUser);
      expect(component.successfullySent).toEqual(true);
    });

    it('should show the success component', () => {
      component.onSuccess(testUser);

      fixture.detectChanges();

      const successComponent = fixture.debugElement.query(By.directive(SignupSuccessComponent));
      expect(successComponent).toBeTruthy();
    });

    it('should hide show the form component', () => {
      component.onSuccess(testUser);

      fixture.detectChanges();

      const formComponent = fixture.debugElement.query(By.directive(SignupFormComponent));
      expect(formComponent).toBeFalsy();
    });
  });

});
