import {createFeatureSelector, createSelector} from '@ngrx/store';
import {accountNode, AccountState} from './account.reducer';


const accountFeatureSelector = createFeatureSelector<AccountState>(accountNode);

const selectUserAccounts = createSelector(
  accountFeatureSelector,
  (state) => state.userAccounts
);

const selectCurrencies = createSelector(
  accountFeatureSelector,
  (state) => state.currencies
);

export {
  selectUserAccounts,
  selectCurrencies,
};
