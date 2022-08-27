import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFormComponent } from './signup-form.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { testUser } from "@modules/authentication/pages/signup/signup.component.spec";
import { By } from "@angular/platform-browser";
import { UsersService } from "@core/services/users/users.service";
import { of } from "rxjs";

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  let serviceSpy = jasmine.createSpyObj('usersService', {
    'addUser': of(testUser)
  });

  let firstName: FormControl;
  let lastName: FormControl;
  let email: FormControl;
  let password: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupFormComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: UsersService,
          useValue: serviceSpy
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    firstName = component.signupForm.controls.firstName;
    lastName = component.signupForm.controls.lastName;
    email = component.signupForm.controls.email;
    password = component.signupForm.controls.password;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form', () => {
    it('form should be invalid at the start', () => {
      expect(component.signupForm.valid).toBeFalse();
    });

    it('should be able to submit form when form is valid', () => {
      const emitSpy = spyOn(component.success, 'emit');

      component.signupForm.patchValue({
        ...testUser,
        password: 'Aj345678'
      });

      component.onSubmit();

      expect(component.signupForm.valid).toBeTruthy();
      expect(serviceSpy.addUser).toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(testUser);
    });
  });

  describe('First name', () => {
    it('should be invalid at the start', () => {
      expect(firstName.valid).toBeFalsy();
    });

    it('should be required', () => {
      expect(firstName.hasError('required')).toBeTruthy();

      firstName.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#firstName + .input__errors p'))?.nativeElement;
      expect(errors.innerHTML).toEqual('First name is required.')
    });

    it('should be valid when a name is filled in', () => {
      firstName.setValue(testUser.firstName);
      expect(firstName.valid).toBe(true);
    });

    it('should not have required error when name is filled in', () => {
      firstName.setValue(testUser.firstName);
      expect(firstName.hasError('required')).toBeFalsy();

      const errors = fixture.debugElement.query(By.css('#firstName + .input__errors p'))?.nativeElement;
      expect(errors).toBeFalsy();
    });
  });

  describe('Last name', () => {
    it('should be invalid at the start', () => {
      expect(lastName.valid).toBeFalsy();
    });

    it('should be required', () => {
      expect(lastName.hasError('required')).toBeTruthy();

      lastName.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#lastName + .input__errors p'))?.nativeElement;
      expect(errors.innerHTML).toEqual('Last name is required.')
    });

    it('should be valid when a name is filled in', () => {
      lastName.setValue(testUser.lastName);
      expect(lastName.valid).toBe(true);
    });

    it('should not have required error when name is filled in', () => {
      lastName.setValue(testUser.lastName);
      expect(lastName.hasError('required')).toBeFalsy();

      const errors = fixture.debugElement.query(By.css('#lastName + .input__errors p'))?.nativeElement;
      expect(errors).toBeFalsy();
    })
  });

  describe('Email', () => {
    it('should be invalid at the start', () => {
      expect(email.valid).toBeFalsy();
      expect(email.hasError('required')).toBeTruthy();

      email.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#email + .input__errors p'))?.nativeElement;
      expect(errors.innerHTML).toEqual('Email is required.')
    });

    it('should be valid when a name is filled in', () => {
      email.setValue(testUser.email);
      expect(email.valid).toBe(true);
      expect(email.hasError('email')).toBeFalsy();
    });

    it('should be invalid if email is "test"', () => {
      email.setValue('test');
      expect(email.valid).toBe(false);
      expect(email.hasError('email')).toBeTruthy();

      email.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#email + .input__errors p'))?.nativeElement;
      expect(errors.innerHTML).toEqual('The email you provided appears to be invalid.')
    });

    it('should be valid if email is "john@dough.com"', () => {
      email.setValue(testUser.email);
      expect(email.valid).toBe(true);
      expect(email.hasError('email')).toBeFalsy();

      email.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#email + .input__errors p'))?.nativeElement;
      expect(errors).toBeFalsy();
    });
  })

  describe('Password', () => {
    it('should be invalid at the start', () => {
      expect(password.valid).toBeFalsy();
      expect(password.hasError('required')).toBeTruthy();

      password.markAsTouched();
      fixture.detectChanges();

      const errors = fixture.debugElement.query(By.css('#password + .input__errors p'))?.nativeElement;
      expect(errors.innerHTML).toEqual('Password is required.')
    });

    it('should have validity for Minimum characters (8)', () => {
      password.setValue('al');
      expect(password.hasError('minlength')).toBeTruthy();

      password.setValue('aaaaaaaa');
      expect(password.hasError('minlength')).toBeFalsy();

      password.markAsDirty();
      fixture.detectChanges();

      const listItem = fixture.debugElement.query(By.css('[data-test="password-min-characters"]'))?.nativeElement;
      expect(listItem.classList).toContain('active');
    });

    it('should have validity for lowercase and uppercase', () => {
      let listItem = fixture.debugElement.query(By.css('[data-test="password-cases"]'))?.nativeElement;
      password.setValue('al');
      expect(password.hasError('pattern')).toBeTruthy();

      password.setValue('AS');
      expect(password.hasError('pattern')).toBeTruthy();

      password.markAsDirty();
      fixture.detectChanges();

      expect(listItem.classList).not.toContain('active');

      password.setValue('As');
      expect(password.hasError('pattern')).toBeFalsy();

      password.setValue('aSaaaS');
      expect(password.hasError('pattern')).toBeFalsy();

      password.markAsDirty();
      fixture.detectChanges();

      expect(listItem.classList).toContain('active');
    });

    it('should have validity for first and last name', () => {
      let listItem = fixture.debugElement.query(By.css('[data-test="password-names"]'))?.nativeElement;
      firstName.setValue(testUser.firstName);
      lastName.setValue(testUser.lastName);
      password.setValue('');

      expect(component.signupForm.hasError('nameIncluded')).toBeFalsy();

      password.setValue('Joh');
      expect(component.signupForm.hasError('nameIncluded')).toBeFalsy();

      password.markAsDirty();
      fixture.detectChanges();

      expect(listItem.classList).toContain('active');

      password.setValue(testUser.firstName);
      fixture.detectChanges();

      expect(component.signupForm.hasError('nameIncluded')).toBeTruthy();
      expect(listItem.classList).not.toContain('active');

      password.setValue(testUser.lastName);
      fixture.detectChanges();

      expect(component.signupForm.hasError('nameIncluded')).toBeTruthy();
      expect(listItem.classList).not.toContain('active');

      password.setValue('jOhN');
      fixture.detectChanges();

      expect(component.signupForm.hasError('nameIncluded')).toBeTruthy();
      expect(listItem.classList).not.toContain('active');
    });
  });

});
