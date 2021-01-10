import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectUser} from '../../../store/auth/auth.selectors';
import {map} from 'rxjs/operators';
import {AuthState} from '../../../store/auth/auth.reducer';
import {SignOutAction} from '../../../store/auth/auth.actions';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {selectCurrencies, selectUserAccounts} from '../../../store/account/account.selectors';
import {AccountState} from '../../../store/account/account.reducer';
import Currency from '../../../models/Currency';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  public userFullName$ = this.storeAuth$.pipe(select(selectUser)).pipe(map(u => u?.getFullName() ?? ''));

  public userName = '';
  public userInitials = '';

  public accounts$ = this.accountsStore$.pipe(select(selectUserAccounts));
  public currencies: Currency[] = [];

  constructor(
    private storeAuth$: Store<AuthState>,
    private accountsStore$: Store<AccountState>,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.userFullName$.subscribe((u) => {
      this.userName = u;

      const initials = u.split(' ', 2) ?? [];
      if (initials.length !== 2) {
        this.userInitials = '';
      } else {
        this.userInitials = initials[0][0].toUpperCase() + initials[1][0].toUpperCase();
      }
    });

    this.accountsStore$.pipe(select(selectCurrencies)).subscribe((c) => this.currencies = c);
  }

  ngOnInit(): void {

  }

  onChangePassword(): void {
    this.dialog.open(ChangePasswordFormComponent, {
      width: '700px',
    });
  }

  onEditProfile(): void {
    this.dialog.open(ChangeUserInfoFormComponent, {
      width: '700px',
    });
  }

  onLogout(): void {
    this.storeAuth$.dispatch(new SignOutAction());
    this.router.navigateByUrl('/sign-in').catch();
  }

  getWalletCurrencySign(currencyId: string): string | null {
    const c = this.currencies.find((cc) => cc.id === currencyId);
    if (c) {
      return c.code;
    }
    return null;
  }

  async navigateToAccount(id: string): Promise<boolean> {
    return this.router.navigateByUrl(`/account/${id}`);
  }
}

@Component({
  selector: 'app-change-password-form',
  template: `
    <div>
      <app-change-password (whenClose)="dialogRef.close()" (whenSubmit)="dialogRef.close()"></app-change-password>
    </div>
  `,
})
export class ChangePasswordFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordFormComponent>
  ) {
  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'app-change-user-info-form',
  template: `
    <div>
      <app-change-user-info (whenClose)="dialogRef.close()" (whenSubmit)="dialogRef.close()"></app-change-user-info>
    </div>
  `,
})
export class ChangeUserInfoFormComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ChangeUserInfoFormComponent>
  ) {
  }

  ngOnInit(): void {
  }
}
