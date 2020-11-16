import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthState} from '../../store/auth/auth.reduces';
import {ActionsSubject, Store} from '@ngrx/store';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthActionsTypes, SignInFailureAction, SignInSuccessAction, TrySignInAction} from '../../store/auth/auth.actions';
import {ofType} from '@ngrx/effects';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();
  failedToAuthMessage: boolean;

  constructor(
    private store$: Store<AuthState>,
    private actions$: ActionsSubject,
  ) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });

    this.failedToAuthMessage = false;

    this.actions$
      .pipe(
        ofType<SignInSuccessAction>(AuthActionsTypes.SIGN_IN_SUCCESS),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
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
      this.store$.dispatch(new TrySignInAction({email, password}));
    }
  }

  showErrorMessage(): void {
    this.failedToAuthMessage = true;
    setTimeout(() => {
      this.failedToAuthMessage = false;
    }, 3000);
  }
}
