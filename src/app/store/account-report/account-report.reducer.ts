import AccountReport from '../../models/AccountReport';
import {AccountReportActions, AccountReportActionsTypes} from './account-report.actions';

export const accountReportNode = 'accountReportNode';

export interface AccountReportState {
  accountReport: AccountReport|null;
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
    case AccountReportActionsTypes.FAILED_LOAD_ACCOUNT_REPORT:
    default: {
      return state;
    }
  }
}
