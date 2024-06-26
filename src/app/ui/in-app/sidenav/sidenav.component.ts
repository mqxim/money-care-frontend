import { Component, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AccountState } from '../../../store/account/account.reducer';
import { selectCurrencies, selectUserAccounts } from '../../../store/account/account.selectors';
import { AccountReport, Currency } from '../../../store/model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteAccountAction, RenameAccountAction } from '../../../store/account/account.actions';
import { Router } from '@angular/router';
import { selectAccountReport } from '../../../store/account-report/account-report.selectors';
import { ClearAccountReportAction } from '../../../store/account-report/account-report.actions';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: [ './sidenav.component.scss' ]
})
export class SidenavComponent implements OnInit {
  public isEditAccountsMode = false;
  public accounts$ = this.accountsStore$.pipe(select(selectUserAccounts));
  public currencies: Currency[] = [];

  constructor(
    private accountsStore$: Store<AccountState>,
    public dialog: MatDialog,
    private router: Router
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

  async navigateToAccount(id: string): Promise<boolean> {
    if (!this.isEditAccountsMode) {
      return this.router.navigateByUrl(`/account/${id}`);
    }
  }

  onCreateAccount(): void {
    this.dialog.open(CreateAccountDialogComponent, {
      width: '700px',
    });
  }

  onDeleteAccount(id: string): void {
    this.dialog.open(DeleteAccountDialogComponent, {
      width: '700px',
      data: {
        accountId: id
      }
    });
  }

  onRenameAccount(id: string): void {
    this.dialog.open(RenameAccountDialogComponent, {
      width: '700px',
      data: {
        accountId: id
      }
    });
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-create-account-dialog',
  template: `
    <div>
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

@Component({
  selector: 'app-delete-account-dialog',
  template: `
    <div>
      <app-delete-account-form (whenClose)="onClose(false)" (whenSubmit)="onClose(true)"></app-delete-account-form>
    </div>`
})
export class DeleteAccountDialogComponent {
  private report: AccountReport;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { accountId: string },
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private accountsStore$: Store<AccountState>,
    private accountReportStore$: Store<AccountReport>,
    private router: Router
  ) {

    this.accountReportStore$
      .pipe(select(selectAccountReport))
      .subscribe((report) => this.report = report);
  }

  onClose(isDelete): void {
    if (isDelete) {
      this.accountsStore$.dispatch(new DeleteAccountAction({ accountId: this.data.accountId }));

      if (this.report.account.id === this.data.accountId) {
        this.router.navigateByUrl('/').catch();
        this.accountReportStore$.dispatch(new ClearAccountReportAction());
      }
    }
    this.dialogRef.close(isDelete);
  }
}

@Component({
  selector: 'app-rename-account-dialog',
  template: `
    <div>
      <app-rename-account-form (whenClose)="onClose()" (whenSubmit)="onSubmit($event)"></app-rename-account-form>
    </div>
  `
})
export class RenameAccountDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { accountId: string },
    public dialogRef: MatDialogRef<CreateAccountDialogComponent>,
    private accountsStore$: Store<AccountState>,
  ) {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(info: { newName: string }): void {
    this.accountsStore$.dispatch(new RenameAccountAction({accountId: this.data.accountId, newName: info.newName}));
    this.dialogRef.close();
  }
}
