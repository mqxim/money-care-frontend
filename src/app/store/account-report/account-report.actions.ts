import {Action} from '@ngrx/store';
import AccountReport from '../../models/AccountReport';

export enum AccountReportActionsTypes {
  LOAD_ACCOUNT_REPORT = '[AccountReport] LOAD_ACCOUNT_REPORT',
  ACCOUNT_REPORT_LOADED = '[AccountReport] ACCOUNT_REPORT_LOADED',
  FAILED_LOAD_ACCOUNT_REPORT = '[AccountReport] FAILED_LOAD_ACCOUNT_REPORT',
}

export class LoadAccountReportAction implements Action {
  readonly type = AccountReportActionsTypes.LOAD_ACCOUNT_REPORT;

  constructor(public payload: {
    accountId: string,
    startDate: string,
    endDate: string
  }) {
  }
}

export class AccountReportLoaded implements Action {
  readonly type = AccountReportActionsTypes.ACCOUNT_REPORT_LOADED;

  constructor(public payload: {
    accountReport: AccountReport
  }) {
  }
}

export class FailedLoadAccountReport implements Action {
  readonly type = AccountReportActionsTypes.FAILED_LOAD_ACCOUNT_REPORT;
}

type AccountReportActions = LoadAccountReportAction
  | AccountReportLoaded
  | FailedLoadAccountReport;

export {
  AccountReportActions
};
