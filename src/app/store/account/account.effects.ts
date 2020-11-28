import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {
  AccountActionsTypes, CreateAccountAction, CreateAccountSucceededAction,
  CurrenciesLoadedAction, DeleteAccountAction, DeleteAccountSucceededAction, FailedToCreateAccountAction, FailedToDeleteAccountAction,
  FailedToLoadCurrenciesAction,
  FailedToLoadUserAccountsAction, FailedToRenameAccountAction,
  LoadUserAccountsAction, RenameAccountAction, RenameAccountSucceededAction,
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
          .getUserAccounts()
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

  @Effect()
  deleteAccount(): Observable<any> {
    return this.actions$
      .pipe(
        ofType<DeleteAccountAction>(AccountActionsTypes.DELETE_ACCOUNT),
        exhaustMap(action => {
          return this.accountService.deleteAccount(action.payload.accountId)
            .pipe(
              map(() => new DeleteAccountSucceededAction({deletedAccountId: action.payload.accountId})),
              catchError(() => of(new FailedToDeleteAccountAction()))
            );
        })
      );
  }

  @Effect()
  renameAccount(): Observable<any> {
    return this.actions$
      .pipe(
        ofType<RenameAccountAction>(AccountActionsTypes.RENAME_ACCOUNT_ACTION),
        exhaustMap(action => {
          return this.accountService.renameAccount(action.payload.accountId, action.payload.newName)
            .pipe(
              map((a) => new RenameAccountSucceededAction({account: a})),
              catchError(() => of(new FailedToRenameAccountAction()))
            );
        })
      );
  }
}
