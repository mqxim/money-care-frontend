import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  AccountActionsTypes, CreateAccountAction, CreateAccountSucceededAction,
  CurrenciesLoadedAction, FailedToCreateAccountAction,
  FailedToLoadCurrenciesAction,
  FailedToLoadUserAccountsAction,
  LoadUserAccountsAction,
  UserAccountsLoadedAction
} from './account.actions';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import AccountService from '../../services/account.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {
  }

  @Effect()
  fetchAccount(): Observable<any> {
    return this.actions$.pipe(
      ofType<LoadUserAccountsAction>(AccountActionsTypes.LOAD_USER_ACCOUNTS),
      exhaustMap(() =>
        this.accountService
          .getUserAccount()
          .pipe(
            map((response) => {
              return new UserAccountsLoadedAction({accounts: response});
            }),
            catchError(() => {
              return of(new FailedToLoadUserAccountsAction());
            })
          )
      )
    );
  }

  @Effect()
  fetchCurrencies(): Observable<any> {
    return this.actions$.pipe(
      ofType<LoadUserAccountsAction>(AccountActionsTypes.LOAD_CURRENCIES),
      exhaustMap(() => {
        return this.accountService.getCurrencies()
          .pipe(
            map(response => new CurrenciesLoadedAction({currencies: response})),
            catchError(() => of(new FailedToLoadCurrenciesAction()))
          );
      })
    );
  }

  @Effect()
  createAccount(): Observable<any> {
    return this.actions$
      .pipe(
        ofType<CreateAccountAction>(AccountActionsTypes.CREATE_ACCOUNT_ACTION),
        exhaustMap((action) => {
          return this.accountService.createAccount(action.payload.name, action.payload.currencyId)
            .pipe(
              map((response) => new CreateAccountSucceededAction({account: response})),
              catchError(() => of(new FailedToCreateAccountAction()))
            );
        })
      );
  }

}
