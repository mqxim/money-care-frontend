import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState } from '../../store/auth/auth.reducer';
import { ActionsSubject, Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthActionsTypes, SignInFailureAction, SignInSuccessAction, SignOutAction, TrySignInAction } from '../../store/auth/auth.actions';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <h2>Sign In</h2>
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
              <mat-error>Password is required</mat-error>
            </mat-form-field>
            <div class="sign-in-button">
              <button mat-raised-button color="primary">Sign In</button>
            </div>
            <div class="sign-in-error-description">
              <mat-error>{{failedToAuthMessage === true ? 'Invalid credentials, please try again' : '&nbsp;'}}</mat-error>
            </div>
            <div class="create-account-button">
              <a mat-button [routerLink]="['/sign-up']">Or create a new user account</a>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrls: [ './styles/sign-in.component.scss' ]
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  failedToAuthMessage: boolean;

  constructor(
    private store$: Store<AuthState>,
    private actions$: ActionsSubject,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, Validators.required),
    });

    this.failedToAuthMessage = false;

    this.store$.dispatch(new SignOutAction());

    this.actions$
      .pipe(
        ofType<SignInSuccessAction>(AuthActionsTypes.SIGN_IN_SUCCESS),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.router.navigateByUrl('/').then(() => {
        });
      });

    this.actions$
      .pipe(
        ofType<SignInFailureAction>(AuthActionsTypes.SIGN_IN_FAILURE),
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
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;
      this.store$.dispatch(new TrySignInAction({ email, password }));
    }
  }

  showErrorMessage(): void {
    this.failedToAuthMessage = true;
    setTimeout(() => {
      this.failedToAuthMessage = false;
    }, 3000);
  }
}
