import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  AccountReportActionsTypes,
  AccountReportLoaded,
  CreateAccountTransactionAction,
  CreateAccountTransactionFailedAction,
  CreateAccountTransactionLoadedAction,
  DeleteAccountTransactionAction,
  DeleteTransactionFailedAction,
  DeleteTransactionLoadedAction,
  FailedLoadAccountReport,
  LoadAccountReportAction
} from './account-report.actions';
import { AccountReportService } from './account-report.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { exhaustMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AccountReportEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountReportService,
  ) {
  }

  @Effect()
  fetchReport(): Observable<any> {
    return this.actions$.pipe(
      ofType<LoadAccountReportAction>(AccountReportActionsTypes.LOAD_ACCOUNT_REPORT),
      exhaustMap((action) => {
        return fromPromise(
          this.accountService.getAccountReport({
            accountId: action.payload.accountId,
            startDate: action.payload.startDate,
            endDate: action.payload.endDate,
          })
            .then((r) => new AccountReportLoaded({ accountReport: r }))
            .catch(() => new FailedLoadAccountReport())
        );
      })
    );
  }

  @Effect()
  deleteTransaction(): Observable<any> {
    return this.actions$.pipe(
      ofType<DeleteAccountTransactionAction>(AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION),
      exhaustMap((action) => fromPromise(
        this.accountService.deleteTransaction({
          accountId: action.payload.accountId,
          transactionId: action.payload.transactionId,
        })
          .then(() => new DeleteTransactionLoadedAction({
            accountId: action.payload.accountId,
            transactionId: action.payload.transactionId,
          }))
          .catch(() => new DeleteTransactionFailedAction({
            accountId: action.payload.accountId,
            transactionId: action.payload.transactionId,
          }))
        )
      )
    );
  }

  @Effect()
  createTransaction(): Observable<any> {
    return this.actions$.pipe(
      ofType<CreateAccountTransactionAction>(AccountReportActionsTypes.CREATE_ACCOUNT_TRANSACTION),
      exhaustMap((action) => {
        return fromPromise(this.accountService.createTransaction({
            accountId: action.payload.accountId,
            date: new Date(action.payload.dateTime),
            categoryId: action.payload.categoryId,
            cost: action.payload.cost,
            comment: action.payload.comment,
          })
            .then(() => new CreateAccountTransactionLoadedAction())
            .catch(() => new CreateAccountTransactionFailedAction())
        );
      })
    );
  }
}
