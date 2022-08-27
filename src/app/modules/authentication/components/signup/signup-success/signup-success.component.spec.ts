import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  SignupSuccessComponent
} from "@modules/authentication/components/signup/signup-success/signup-success.component";
import { testUser } from "@modules/authentication/pages/signup/signup.component.spec";
import { By } from "@angular/platform-browser";

describe('SignupSuccessComponent', () => {
  let component: SignupSuccessComponent;
  let fixture: ComponentFixture<SignupSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SignupSuccessComponent
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should show the name of the user', () => {
    component.user = testUser;
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('h1')).nativeElement.textContent;
    expect(title).toContain(testUser.firstName);
  });
});
