import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActionsSubject, Store} from '@ngrx/store';
import {AuthState} from '../../store/auth/auth.reducer';
import {ofType} from '@ngrx/effects';
import {
  AuthActionsTypes, SignOutAction,
  SignUpFailureAction,
  SignUpSuccessAction, TrySignUpAction,
} from '../../store/auth/auth.actions';
import {takeUntil} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  template: `
    <div class="sign-up-container">
      <mat-card>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <h2>Sign Up</h2>
            <mat-form-field class="full-width-input">
              <label>
                <input matInput placeholder="First Name" formControlName="firstName" required>
              </label>
              <mat-error>
                First name is required and should contains only letters
              </mat-error>
            </mat-form-field>
            <mat-form-field class="full-width-input">
              <label>
                <input matInput placeholder="Last Name" formControlName="lastName" required>
              </label>
              <mat-error>
                Last name is required and should contains only letters
              </mat-error>
            </mat-form-field>
            <mat-form-field class="full-width-input">
              <label>
                <input matInput placeholder="Email" formControlName="email" required>
              </label>
              <mat-error>
                Email is required
              </mat-error>
            </mat-form-field>
            <mat-form-field class="full-width-input">
              <label>
                <input matInput type="password" placeholder="Password" formControlName="password" required>
              </label>
              <mat-error>Password should contain at least 8 characters</mat-error>
            </mat-form-field>
            <div>
              <mat-error>{{getErrors()}}</mat-error>
            </div>
            <div class="sign-up-button">
              <button mat-raised-button color="primary">Sign Up</button>
            </div>
            <div class="sign-up-error-description">
              <mat-error >{{failedToCreateAccountMessage === true ? 'Account with same email already exists' : '&nbsp;'}}</mat-error>
            </div>
            <div class="sing-in-button">
              <a mat-button [routerLink]="['/sign-in']">Or authorize to an existing account</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>

  `,
  styleUrls: ['./styles/sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  failedToCreateAccountMessage: boolean;

  constructor(
    private store$: Store<AuthState>,
    private actions$: ActionsSubject,
    private router: Router
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        (control) => /[-a-zA-ZЀ-ӿÀ-ÿĀ-ſƀ-ɏ']+$/.test(control.value) ? null : { firstName: true }
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        (control) => /[-a-zA-ZЀ-ӿÀ-ÿĀ-ſƀ-ɏ']+$/.test(control.value) ? null : { lastName: true }
      ]),
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(8) ]),
    });

    this.store$.dispatch(new SignOutAction());

    this.actions$
      .pipe(
        ofType<SignUpSuccessAction>(AuthActionsTypes.SIGN_UP_SUCCESS),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/').then(() => {}));

    this.actions$
      .pipe(
        ofType<SignUpFailureAction>(AuthActionsTypes.SIGN_UP_FAILURE),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showErrorMessage());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store$.dispatch(new TrySignUpAction({
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }));
    }
  }

  getErrors(): string {
    if (!this.form.errors) {
      return '';
    }
    let result = '';
    for (const i in this.form.errors) {
      if (this.form.errors.hasOwnProperty(i)) {
        result += (this.form.errors[i]);
      }
    }
    return result ? result : '&nbsp;';
  }

  showErrorMessage(): void {
    this.failedToCreateAccountMessage = true;

    setTimeout(() => this.failedToCreateAccountMessage = false, 5000);
  }
}
