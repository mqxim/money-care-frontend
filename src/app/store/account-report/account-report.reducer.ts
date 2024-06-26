import { AccountReport } from '../model';
import { AccountReportActions, AccountReportActionsTypes } from './account-report.actions';

export const accountReportNode = 'accountReportNode';

export interface AccountReportState {
  accountReport: AccountReport | null;
}

const initialState: AccountReportState = {
  accountReport: null
};

export function accountReportReduces(state = initialState, action: AccountReportActions): AccountReportState {
  switch (action.type) {
    case AccountReportActionsTypes.ACCOUNT_REPORT_LOADED: {
      return {
        ...state,
        accountReport: action.payload.accountReport,
      };
    }
    case AccountReportActionsTypes.SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT: {
      return {
        ...state,
        accountReport: new AccountReport(
          state.accountReport.startDate,
          state.accountReport.endDate,
          state.accountReport.transactions.slice().sort((a, b) => {
            return Math.abs(b.cost) - Math.abs(a.cost);
          }),
          state.accountReport.currentBalance,
          state.accountReport.incomes,
          state.accountReport.expenses,
          state.accountReport.periodBalance,
          state.accountReport.account,
          state.accountReport.currency,
        ),
      };
    }
    case AccountReportActionsTypes.SORT_ACCOUNT_TRANSACTIONS_BY_RECENT: {
      return {
        ...state,
        accountReport: new AccountReport(
          state.accountReport.startDate,
          state.accountReport.endDate,
          state.accountReport.transactions.slice().sort((a, b) => {
            return b.createDate.getTime() - a.createDate.getTime();
          }),
          state.accountReport.currentBalance,
          state.accountReport.incomes,
          state.accountReport.expenses,
          state.accountReport.periodBalance,
          state.accountReport.account,
          state.accountReport.currency,
        ),
      };
    }
    case AccountReportActionsTypes.CLEAR_ACCOUNT_REPORT: {
      return {
        ...state,
        accountReport: null,
      };
    }
    default: {
      return state;
    }
  }
}
