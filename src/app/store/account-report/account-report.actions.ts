import {Action} from '@ngrx/store';
import AccountReport from '../../models/AccountReport';

export enum AccountReportActionsTypes {
  LOAD_ACCOUNT_REPORT = '[AccountReport] LOAD_ACCOUNT_REPORT',
  ACCOUNT_REPORT_LOADED = '[AccountReport] ACCOUNT_REPORT_LOADED',
  FAILED_LOAD_ACCOUNT_REPORT = '[AccountReport] FAILED_LOAD_ACCOUNT_REPORT',
  SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT = '[AccountReport] SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT',
  SORT_ACCOUNT_TRANSACTIONS_BY_RECENT = '[AccountReport] SORT_ACCOUNT_TRANSACTIONS_BY_RECENT',
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

export class SortAccountTransactionsBySignificantAction implements Action {
  readonly type = AccountReportActionsTypes.SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT;
}

export class SortAccountTransactionsByRecentAction implements Action {
  readonly type = AccountReportActionsTypes.SORT_ACCOUNT_TRANSACTIONS_BY_RECENT;
}

type AccountReportActions = LoadAccountReportAction
  | AccountReportLoaded
  | FailedLoadAccountReport
  | SortAccountTransactionsBySignificantAction
  | SortAccountTransactionsByRecentAction
  ;

export {
  AccountReportActions
};
