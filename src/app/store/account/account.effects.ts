import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  AccountActionsTypes, CreateAccountAction, CreateAccountSucceededAction,
  CurrenciesLoadedAction, DeleteAccountAction, DeleteAccountSucceededAction, FailedToCreateAccountAction, FailedToDeleteAccountAction,
  FailedToLoadCurrenciesAction,
  FailedToLoadUserAccountsAction, FailedToRenameAccountAction,
  LoadUserAccountsAction, RenameAccountAction, RenameAccountSucceededAction,
  UserAccountsLoadedAction
} from './account.actions';
import { Observable } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';
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
      exhaustMap(() => {
        return fromPromise(new Promise(async (resolve) => {
          this.accountService.getUserAccounts()
            .then((response) => resolve(new UserAccountsLoadedAction({ accounts: response })))
            .catch(() => new FailedToLoadUserAccountsAction())
          ;
        }));
      })
    );
  }

  @Effect()
  fetchCurrencies(): Observable<any> {
    return this.actions$.pipe(
      ofType<LoadUserAccountsAction>(AccountActionsTypes.LOAD_CURRENCIES),
      exhaustMap(() => {
        return fromPromise(new Promise(async (resolve) => {
          this.accountService.getCurrencies()
            .then((response) => resolve(new CurrenciesLoadedAction({ currencies: response })))
            .catch(() => new FailedToLoadCurrenciesAction())
          ;
        }));
      })
    );
  }

  @Effect()
  createAccount(): Observable<any> {
    return this.actions$.pipe(
      ofType<CreateAccountAction>(AccountActionsTypes.CREATE_ACCOUNT_ACTION),
      exhaustMap((action) => {
        return fromPromise(new Promise(async (resolve) => {
          this.accountService.createAccount(action.payload.name, action.payload.currencyId)
            .then((response) => resolve(new CreateAccountSucceededAction({ account: response })))
            .catch(() => new FailedToCreateAccountAction())
          ;
        }));
      })
    );
  }

  @Effect()
  deleteAccount(): Observable<any> {
    return this.actions$.pipe(
      ofType<DeleteAccountAction>(AccountActionsTypes.DELETE_ACCOUNT),
      exhaustMap((action) => {
        return fromPromise(new Promise(async (resolve) => {
          this.accountService.deleteAccount(action.payload.accountId)
            .then(() => resolve(new DeleteAccountSucceededAction({ deletedAccountId: action.payload.accountId })))
            .catch(() => new FailedToDeleteAccountAction())
          ;
        }));
      })
    );
  }

  @Effect()
  renameAccount(): Observable<any> {
    return this.actions$.pipe(
      ofType<RenameAccountAction>(AccountActionsTypes.RENAME_ACCOUNT_ACTION),
      exhaustMap((action) => {
        return fromPromise(new Promise(async (resolve) => {
          this.accountService.renameAccount(action.payload.accountId, action.payload.newName)
            .then((response) => resolve(new RenameAccountSucceededAction({ account: response })))
            .catch(() => new FailedToRenameAccountAction())
          ;
        }));
      })
    );
  }
}

