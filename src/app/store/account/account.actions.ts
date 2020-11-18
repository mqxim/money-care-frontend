import {Action} from '@ngrx/store';
import Account from '../../models/Account';
import Currency from '../../models/Currency';

export enum AccountActionsTypes {
  LOAD_USER_ACCOUNTS = '[Account] LOAD_USER_ACCOUNT',
  USER_ACCOUNTS_LOADED = '[Account] USER_ACCOUNTS_LOADED',
  FAILED_TO_LOAD_USER_ACCOUNTS = '[Account] FAILED_TO_LOAD_USER_ACCOUNTS',
  LOAD_CURRENCIES = '[Account] LOAD_CURRENCIES',
  CURRENCIES_LOADED = '[Accounts] CURRENCIES_LOADED',
  FAILED_TO_LOAD_CURRENCIES = '[Accounts] FAILED_TO_LOAD_CURRENCIES',
  CREATE_ACCOUNT_ACTION = '[Accounts] CREATE_ACCOUNT_ACTION',
  FAILED_TO_CREATE_ACCOUNT = '[Accounts] FAILED_TO_CREATE_ACCOUNT',
  CREATE_ACCOUNT_SUCCEEDED = '[Accounts] CREATE_ACCOUNT_SUCCEEDED'
}

export class LoadCurrenciesAction implements Action {
  readonly type = AccountActionsTypes.LOAD_CURRENCIES;
}

export class CurrenciesLoadedAction implements Action {
  readonly type = AccountActionsTypes.CURRENCIES_LOADED;

  constructor(public payload: { currencies: Currency[] }) {
  }
}

export class FailedToLoadCurrenciesAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_LOAD_CURRENCIES;
}

export class LoadUserAccountsAction implements Action {
  readonly type = AccountActionsTypes.LOAD_USER_ACCOUNTS;
}

export class UserAccountsLoadedAction implements Action {
  readonly type = AccountActionsTypes.USER_ACCOUNTS_LOADED;

  constructor(public payload: { accounts: Account[] }) {
  }
}

export class FailedToLoadUserAccountsAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_LOAD_USER_ACCOUNTS;
}

export class CreateAccountAction implements Action {
  readonly type = AccountActionsTypes.CREATE_ACCOUNT_ACTION;

  constructor(public payload: {
    name: string,
    currencyId: string,
  }) {
  }
}

export class FailedToCreateAccountAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_CREATE_ACCOUNT;
}

export class CreateAccountSucceededAction implements Action {
  readonly type = AccountActionsTypes.CREATE_ACCOUNT_SUCCEEDED;

  constructor(public payload: {
    account: Account
  }) {
    console.log(payload);
  }
}

type AccountActions = UserAccountsLoadedAction
  | LoadUserAccountsAction
  | FailedToLoadUserAccountsAction
  | LoadCurrenciesAction
  | CurrenciesLoadedAction
  | FailedToLoadCurrenciesAction
  | CreateAccountAction
  | FailedToCreateAccountAction
  | CreateAccountSucceededAction
  ;

export {
  AccountActions
};
