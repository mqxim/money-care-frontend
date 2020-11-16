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

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  failedToCreateAccountMessage: boolean;

  constructor(
    private store$: Store<AuthState>,
    private actions$: ActionsSubject,
  ) {
    this.form = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        (control) => /[-a-zA-ZЀ-ӿÀ-ÿĀ-ſƀ-ɏ']+$/.test(control.value) ? null : {firstName: true}
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        (control) => /[-a-zA-ZЀ-ӿÀ-ÿĀ-ſƀ-ɏ']+$/.test(control.value) ? null : {lastName: true}
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      passwordRepeat: new FormControl(null, [])
    }, (control) => {
      const ctrl = control as FormGroup;
      if (ctrl.controls.password.value === ctrl.controls.passwordRepeat.value) {
        return null;
      }

      return {
        passwordRepeatDoesNotMatch: 'Password does not match password repeat'
      };
    });

    this.store$.dispatch(new SignOutAction());

    this.actions$
      .pipe(
        ofType<SignUpSuccessAction>(AuthActionsTypes.SIGN_UP_SUCCESS),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {});

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
