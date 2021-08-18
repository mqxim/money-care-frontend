import { Action } from '@ngrx/store';
import { Account, Category, Currency } from '../model';

export enum AccountActionsTypes {
  LOAD_USER_ACCOUNTS = '[Account] LOAD_USER_ACCOUNT',
  USER_ACCOUNTS_LOADED = '[Account] USER_ACCOUNTS_LOADED',
  FAILED_TO_LOAD_USER_ACCOUNTS = '[Account] FAILED_TO_LOAD_USER_ACCOUNTS',
  LOAD_CURRENCIES = '[Account] LOAD_CURRENCIES',
  CURRENCIES_LOADED = '[Account] CURRENCIES_LOADED',
  FAILED_TO_LOAD_CURRENCIES = '[Account] FAILED_TO_LOAD_CURRENCIES',
  CREATE_ACCOUNT_ACTION = '[Account] CREATE_ACCOUNT_ACTION',
  FAILED_TO_CREATE_ACCOUNT = '[Account] FAILED_TO_CREATE_ACCOUNT',
  CREATE_ACCOUNT_SUCCEEDED = '[Account] CREATE_ACCOUNT_SUCCEEDED',
  DELETE_ACCOUNT = '[Account] DELETE_ACCOUNT',
  DELETE_ACCOUNT_SUCCEEDED = '[Account] DELETE_ACCOUNT_SUCCEEDED',
  FAILED_TO_DELETE_ACCOUNT = '[Account] FAILED_TO_DELETE_ACCOUNT',
  RENAME_ACCOUNT_ACTION = '[Account] RENAME_ACCOUNT_ACTION',
  RENAME_ACCOUNT_SUCCEEDED = '[Account] RENAME_ACCOUNT_SUCCEEDED',
  FAILED_TO_RENAME_ACCOUNT = '[Account] FAILED_TO_RENAME_ACCOUNT',
  LOAD_CATEGORIES_ACTION = '[Account] LOAD_CATEGORIES_ACTION',
  CATEGORIES_LOADED = '[Account] CATEGORIES_LOADED',
  FAILED_TO_LOAD_CATEGORIES = '[Account] FAILED_TO_LOAD_CATEGORIES',
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
  }
}

export class DeleteAccountAction implements Action {
  readonly type = AccountActionsTypes.DELETE_ACCOUNT;

  constructor(public payload: {
    accountId: string
  }) {
  }
}

export class DeleteAccountSucceededAction implements Action {
  readonly type = AccountActionsTypes.DELETE_ACCOUNT_SUCCEEDED;

  constructor(public payload: {
    deletedAccountId: string
  }) {
  }
}

export class FailedToDeleteAccountAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_DELETE_ACCOUNT;
}

export class RenameAccountAction implements Action {
  readonly type = AccountActionsTypes.RENAME_ACCOUNT_ACTION;

  constructor(
    public payload: {
      accountId: string,
      newName: string
    }
  ) {
  }
}

export class RenameAccountSucceededAction implements Action {
  readonly type = AccountActionsTypes.RENAME_ACCOUNT_SUCCEEDED;

  constructor(public payload: {
    account: Account
  }) {
  }
}

export class FailedToRenameAccountAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_RENAME_ACCOUNT;
}

export class LoadCategoriesAction implements Action {
  readonly type = AccountActionsTypes.LOAD_CATEGORIES_ACTION;
}

export class CategoriesLoadedAction implements Action {
  readonly type = AccountActionsTypes.CATEGORIES_LOADED;

  constructor(public payload: {
    categories: Category[],
  }) {
  }
}

export class FailedToLoadCategories implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_LOAD_CATEGORIES;
}

export class FailedToLoadCategoriesAction implements Action {
  readonly type = AccountActionsTypes.FAILED_TO_LOAD_CATEGORIES;
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
  | DeleteAccountAction
  | DeleteAccountSucceededAction
  | FailedToDeleteAccountAction
  | RenameAccountAction
  | RenameAccountSucceededAction
  | FailedToRenameAccountAction
  | LoadCategoriesAction
  | CategoriesLoadedAction
  | FailedToLoadCategoriesAction
  ;

export {
  AccountActions
};
