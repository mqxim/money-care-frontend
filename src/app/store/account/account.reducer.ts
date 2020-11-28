import Account from '../../models/Account';
import {AccountActions, AccountActionsTypes} from './account.actions';
import Currency from '../../models/Currency';

export const accountNode = 'accountNode';

export interface AccountState {
  userAccounts: Account[];
  currencies: Currency[];
}

const initialState: AccountState = {
  userAccounts: [],
  currencies: [],
};

export function accountReducer(state = initialState, action: AccountActions): AccountState {
  switch (action.type) {
    case AccountActionsTypes.USER_ACCOUNTS_LOADED: {
      return {
        ...state,
        userAccounts: action.payload.accounts,
      };
    }
    case AccountActionsTypes.FAILED_TO_LOAD_USER_ACCOUNTS: {
      return {
        ...state,
        userAccounts: [],
      };
    }
    case AccountActionsTypes.CURRENCIES_LOADED: {
      return {
        ...state,
        currencies: action.payload.currencies,
      };
    }
    case AccountActionsTypes.FAILED_TO_LOAD_CURRENCIES: {
      return {
        ...state,
        currencies: [],
      };
    }
    case AccountActionsTypes.CREATE_ACCOUNT_SUCCEEDED: {
      return {
        ...state,
        userAccounts: [...state.userAccounts, action.payload.account]
      };
    }
    case AccountActionsTypes.DELETE_ACCOUNT_SUCCEEDED: {
      return {
        ...state,
        userAccounts: [...state.userAccounts.filter((acc) => acc.id !== action.payload.deletedAccountId)]
      };
    }
    case AccountActionsTypes.RENAME_ACCOUNT_SUCCEEDED: {
      return {
        ...state,
        userAccounts: [...state.userAccounts.map((acc) => {
          return acc.id === action.payload.account.id ? action.payload.account : acc;
        })]
      };
    }
    default: {
      return state;
    }
  }
}
