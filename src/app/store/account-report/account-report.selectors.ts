import {createFeatureSelector, createSelector} from '@ngrx/store';
import {accountReportNode, AccountReportState} from './account-report.reducer';

const accountReportFeatureSelector = createFeatureSelector<AccountReportState>(accountReportNode);

const selectAccountReport = createSelector(
  accountReportFeatureSelector,
  (state) => state.accountReport
);

export {
  selectAccountReport,
};

