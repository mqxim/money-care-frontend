import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AccountState} from '../../../store/account/account.reducers';
import {selectCurrencies, selectUserAccounts} from '../../../store/account/account.selectors';
import Currency from '../../../models/Currency';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public isEditAccountsMode = false;
  public accounts$ = this.accountsStore$.pipe(select(selectUserAccounts));
  public currencies: Currency[] = [];

  constructor(
    private accountsStore$: Store<AccountState>,
    public dialog: MatDialog
  ) {
    this.accountsStore$.pipe(select(selectCurrencies)).subscribe((c) => {
      this.currencies = c;
    });
  }

  getWalletCurrencyName(currencyId: string): string | null {
    const c = this.currencies.find((cc) => cc.id === currencyId);
    if (c) {
      return c.name;
    }
    return null;
  }

  getWalletCurrencySign(currencyId: string): string | null {
    const c = this.currencies.find((cc) => cc.id === currencyId);
    if (c) {
      return c.code;
    }
    return null;
  }

  onCreateAccount(): void {
    this.dialog.open(CreateAccountDialogComponent, {
      width: '700px',
    });
  }

  onDeleteAccount(id: string): void {
    console.log(id);
  }

  onRenameAccount(id: string): void {
    console.log(id);
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-create-account-dialog',
  template: `<div>
    <app-create-account (whenClose)="onClose()" (whenFillForm)="onClose()"></app-create-account>
  </div>`
})
export class CreateAccountDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
  ) {
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
