import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountReportState } from '../../../store/account-report/account-report.reducer';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {
  AccountReportActionsTypes,
  AccountReportLoaded,
  DeleteAccountTransactionAction,
  DeleteTransactionLoadedAction,
  FailedLoadAccountReport,
  LoadAccountReportAction,
  SortAccountTransactionsByRecentAction,
  SortAccountTransactionsBySignificantAction
} from '../../../store/account-report/account-report.actions';
import { UIState } from '../../../store/ui/ui.reducer';
import { UIBeginLoadingAction, UIEndLoadingAction } from '../../../store/ui/ui.actions';
import { selectAccountReport } from '../../../store/account-report/account-report.selectors';
import { AccountReport, Category } from '../../../store/model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AccountState } from '../../../store/account/account.reducer';
import { selectCategories } from '../../../store/account/account.selectors';

export interface CardSettings {
  backgroundColor: string;
  headerBackgroundColor: string;
  headerHeight: string;
  footerBackgroundColor: string;
  footerHeight: string;
}

@Component({
  selector: 'app-account-report',
  templateUrl: './account-report.component.html',
  styleUrls: [ './account-report.component.scss' ]
})
export class AccountReportComponent implements OnInit {
  destroy$ = new Subject<boolean>();

  cardSettings: CardSettings = {
    backgroundColor: 'rgb(121, 96, 186)',
    headerBackgroundColor: 'rgba(0, 0, 0, 0)',
    headerHeight: '30px',
    footerBackgroundColor: 'rgba(0, 0, 0, 0)',
    footerHeight: '30px',
  };

  form: FormGroup = new FormGroup({
    startDate: new FormControl((() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), 1);
    })(), [ Validators.required ]),
    endDate: new FormControl((() => {
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    })(), [ Validators.required ])
  });

  accountReport: AccountReport | null;

  categories: Category[];

  id: string | null = null;

  constructor(
    private activateRoute: ActivatedRoute,
    private accountReportStore$: Store<AccountReportState>,
    private accountsStore$: Store<AccountState>,
    private uiStore$: Store<UIState>,
    private actions$: ActionsSubject,
    private dialog: MatDialog,
  ) {
    this.accountReportStore$.pipe(select(selectAccountReport)).subscribe((d) => this.accountReport = d);

    this.accountsStore$.pipe(select(selectCategories)).subscribe((d) => this.categories = d);

    activateRoute.params.subscribe(params => {
      this.id = params.id;
      this.onAccountChange();
    });

    this.subscribeOnEvents();
  }

  subscribeOnEvents(): void {
    this.actions$
      .pipe(
        ofType<AccountReportLoaded>(AccountReportActionsTypes.ACCOUNT_REPORT_LOADED),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.uiStore$.dispatch(new UIEndLoadingAction()));

    this.actions$
      .pipe(
        ofType<FailedLoadAccountReport>(AccountReportActionsTypes.FAILED_LOAD_ACCOUNT_REPORT),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.uiStore$.dispatch(new UIEndLoadingAction()));

    this.actions$
      .pipe(
        ofType<DeleteTransactionLoadedAction>(AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION_LOADED),
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.onLoadReport();
      });
  }

  onLoadReport(): void {
    if (!this.form.controls.startDate.value || !this.form.controls.endDate.value) {
      return;
    }

    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new LoadAccountReportAction({
        accountId: this.id,
        startDate: this.form.controls.startDate.value.toISOString(),
        endDate: this.form.controls.endDate.value.toISOString(),
      }));
    }, 1000);
  }

  onAccountChange(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new LoadAccountReportAction({
        accountId: this.id,
        startDate: this.form.controls.startDate.value.toISOString(),
        endDate: this.form.controls.endDate.value.toISOString(),
      }));
    }, 1000);
  }

  getAbsolute(x: number): string {
    const num = (Math.round(Math.abs(x) * 100) / 100).toString();
    return num.length > 12 ? num.substr(0, 12) + '...' : num;
  }

  onSignificantSort(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new SortAccountTransactionsBySignificantAction());
      this.uiStore$.dispatch(new UIEndLoadingAction());
    }, 1000);
  }

  onRecentSort(): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new SortAccountTransactionsByRecentAction());
      this.uiStore$.dispatch(new UIEndLoadingAction());
    }, 1000);
  }

  onCreateTransaction(): void {
    this.dialog.open(CreateTransactionDialogComponent, {
      width: '700px',
      minWidth: '310px',
      data: {
        accountId: this.id
      }
    })
      .afterClosed()
      .subscribe((d) => d.submit ? this.onLoadReport() : null);
  }

  onDeleteTransaction(accountId: string, transactionId: string): void {
    this.dialog.open(DeleteTransactionDialogComponent, {
      width: '700px',
      minWidth: '310px',
      data: {
        accountId,
        transactionId,
      }
    })
      .afterClosed()
      .subscribe(result => {
        if (result.submit === true) {
          this.deleteTransaction(accountId, transactionId);
        }
      });
  }

  deleteTransaction(accountId: string, transactionId: string): void {
    this.uiStore$.dispatch(new UIBeginLoadingAction());
    setTimeout(() => {
      this.accountReportStore$.dispatch(new DeleteAccountTransactionAction({
        accountId,
        transactionId
      }));
      this.uiStore$.dispatch(new UIEndLoadingAction());
    }, 1000);
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-create-transaction-dialog',
  template: `
    <div>
      <app-create-transaction-form (whenClose)="dialogRef.close({submit: false})"
                                   (whenSubmit)="dialogRef.close({submit: true})"></app-create-transaction-form>
    </div>`
})
export class CreateTransactionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateTransactionDialogComponent>,
  ) {
  }

  ngOnInit(): void {
  }
}

@Component({
  selector: 'app-delete-transaction-dialog',
  template: `
    <div>
      <app-delete-transaction-form
        (whenSubmit)="onSubmitDelete()"
        (whenClose)="dialogRef.close({submit: false})"
      >
      </app-delete-transaction-form>
    </div>`
})
export class DeleteTransactionDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DeleteTransactionDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onSubmitDelete(): void {
    this.dialogRef.close({ submit: true });
  }
}
