import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
  AccountReportActionsTypes,
  AccountReportLoaded, CreateAccountTransactionAction, CreateAccountTransactionFailedAction, CreateAccountTransactionLoadedAction,
  DeleteAccountTransactionAction, DeleteTransactionFailedAction, DeleteTransactionLoadedAction,
  FailedLoadAccountReport,
  LoadAccountReportAction
} from './account-report.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import AccountReportService from '../../services/account-report.service';

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
        return this.accountService.getAccountReport({
          accountId: action.payload.accountId,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
        })
          .pipe(
            map((r) => new AccountReportLoaded({
              accountReport: r
            })),
            catchError(() => {
              return of(new FailedLoadAccountReport());
            })
          );
      })
    );
  }

  @Effect()
  deleteTransaction(): Observable<any> {
    return this.actions$.pipe(
      ofType<DeleteAccountTransactionAction>(AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION),
      exhaustMap((action) => {
        return this.accountService.deleteTransaction({
          accountId: action.payload.accountId,
          transactionId: action.payload.transactionId,
        })
          .pipe(
            map(() => new DeleteTransactionLoadedAction({
              accountId: action.payload.accountId,
              transactionId: action.payload.transactionId,
            })),
            catchError(() => of(new DeleteTransactionFailedAction({
              accountId: action.payload.accountId,
              transactionId: action.payload.transactionId,
            })))
          );
      })
    );
  }

  @Effect()
  createTransaction(): Observable<any> {
    return this.actions$.pipe(
      ofType<CreateAccountTransactionAction>(AccountReportActionsTypes.CREATE_ACCOUNT_TRANSACTION),
      exhaustMap((action) => {
        return this.accountService.createTransaction({
          accountId: action.payload.accountId,
          dateString: action.payload.dateTime,
          category: action.payload.category,
          cost: action.payload.cost,
          comment: action.payload.comment,
        }).pipe(
          map(() => new CreateAccountTransactionLoadedAction()),
          catchError(() => of(new CreateAccountTransactionFailedAction()))
        );
      })
    );
  }
}
