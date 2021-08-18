import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthState } from '../../../../store/auth/auth.reducer';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  AuthActionsTypes,
  ChangePasswordAction,
  ChangePasswordFailureAction,
  ChangePasswordSuccessAction,
} from '../../../../store/auth/auth.actions';
import { Subject } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  template: `
    <div>
      <h1>🔒 Change password</h1>
      <form [formGroup]="form">
        <mat-form-field class="full-width-input">
          <label>
            <input matInput type="password" placeholder="Old Password" formControlName="oldPassword" required autocomplete="off">
          </label>
          <mat-error>Old password is required</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width-input">
          <label>
            <input matInput type="password" placeholder="New Password" formControlName="newPassword" required autocomplete="off">
          </label>
          <mat-error>New password is required</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width-input">
          <label>
            <input matInput type="password" placeholder="New Password Confirm" formControlName="passwordConfirm" required autocomplete="off">
          </label>
          <mat-error>New password confirm is required</mat-error>
        </mat-form-field>
        <div class="form-controls">
          <button mat-raised-button (click)="onClose()">Cancel</button>
          <button mat-raised-button color="primary" (click)="onSubmit()">Update</button>
        </div>
      </form>
    </div>`,
  selector: 'app-change-password',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  @Output() whenClose = new EventEmitter();
  @Output() whenSubmit = new EventEmitter();

  form: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private store$: Store<AuthState>,
    private actions$: ActionsSubject,
    private snackBar: MatSnackBar,
  ) {
    this.form = new FormGroup(
      {
        oldPassword: new FormControl(null, [Validators.required]),
        newPassword: new FormControl(null, [Validators.required]),
        passwordConfirm: new FormControl(null, [Validators.required]),
      }
    );
  }

  ngOnInit(): void {
    this.actions$
      .pipe(
        ofType<ChangePasswordSuccessAction>(AuthActionsTypes.CHANGE_PASSWORD_SUCCESS),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.openSuccessSnackbar();
      });

    this.actions$
      .pipe(
        ofType<ChangePasswordFailureAction>(AuthActionsTypes.CHANGE_PASSWORD_FAILURE),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.openFailureSnackbar();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store$.dispatch(new ChangePasswordAction(
        {
          oldPassword: this.form.controls.oldPassword.value,
          newPassword: this.form.controls.newPassword.value,
          newPasswordConfirm: this.form.controls.passwordConfirm.value,
        }
      ));
    }
  }

  openSuccessSnackbar(): void {
    this.snackBar.open('Password was updated successfully', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  openFailureSnackbar(): void {
    this.snackBar.open('Failed to update password: check the form for mistakes', 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['failure-message']
    });
  }
}
