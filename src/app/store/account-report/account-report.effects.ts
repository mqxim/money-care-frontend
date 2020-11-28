import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {AccountReportActionsTypes, AccountReportLoaded, FailedLoadAccountReport, LoadAccountReportAction} from './account-report.actions';
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
  fetchReport(): Observable<any>
  {
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
            catchError((e) => {
              console.log(e);
              return of(new FailedLoadAccountReport());
            })
          );
      })
    );
  }
}
