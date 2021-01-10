import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AuthState} from '../../../../store/auth/auth.reducer';
import {selectUser} from '../../../../store/auth/auth.selectors';
import {map} from 'rxjs/operators';
import {ChangeUserinfoAction} from '../../../../store/auth/auth.actions';

@Component({
  template: `
    <div>
      <h1>👤 Change profile</h1>
      <form [formGroup]="form">
        <mat-form-field class="full-width-input">
          <label>
            <input matInput placeholder="First Name" formControlName="firstName" required autocomplete="off">
          </label>
          <mat-error>First name is required</mat-error>
        </mat-form-field>
        <mat-form-field class="full-width-input">
          <label>
            <input matInput placeholder="Last Name" formControlName="lastName" required autocomplete="off">
          </label>
          <mat-error>Last name is required</mat-error>
        </mat-form-field>
        <div class="form-controls">
          <button mat-raised-button (click)="onClose()">Cancel</button>
          <button mat-raised-button color="primary" (click)="onSubmit()">Update</button>
        </div>
      </form>
    </div>
  `,
  selector: 'app-change-user-info',
  styleUrls: ['./change-user-info.component.scss']
})
export class ChangeUserInfoComponent implements OnInit {
  @Output() whenClose = new EventEmitter();
  @Output() whenSubmit = new EventEmitter();

  form: FormGroup;

  public user$ = this.store$.pipe(select(selectUser)).pipe(map(u => u));

  constructor(
    private store$: Store<AuthState>
  ) {

    let fn = '';
    let ln = '';

    this.user$.subscribe((u) => {
      fn = u.firstName;
      ln = u.lastName;
    });

    this.form = new FormGroup(
      {
        firstName: new FormControl(fn, [Validators.required]),
        lastName: new FormControl(ln, [Validators.required]),
      }
    );
  }

  ngOnInit(): void {

  }

  onClose(): void {
    this.whenClose.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store$.dispatch(new ChangeUserinfoAction({
        firstName: this.form.controls.firstName.value,
        lastName: this.form.controls.lastName.value,
      }));

      this.whenSubmit.emit();
    }
  }
}
