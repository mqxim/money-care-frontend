import {Action} from '@ngrx/store';
import AccountReport from '../../models/AccountReport';

export enum AccountReportActionsTypes {
  LOAD_ACCOUNT_REPORT = '[AccountReport] LOAD_ACCOUNT_REPORT',
  ACCOUNT_REPORT_LOADED = '[AccountReport] ACCOUNT_REPORT_LOADED',
  FAILED_LOAD_ACCOUNT_REPORT = '[AccountReport] FAILED_LOAD_ACCOUNT_REPORT',
  SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT = '[AccountReport] SORT_ACCOUNT_TRANSACTIONS_BY_SIGNIFICANT',
  SORT_ACCOUNT_TRANSACTIONS_BY_RECENT = '[AccountReport] SORT_ACCOUNT_TRANSACTIONS_BY_RECENT',
  DELETE_ACCOUNT_TRANSACTION = '[AccountReport] DELETE_ACCOUNT_TRANSACTION',
  DELETE_ACCOUNT_TRANSACTION_LOADED = '[AccountReport] DELETE_ACCOUNT_TRANSACTION_LOADED',
  DELETE_ACCOUNT_TRANSACTION_FAILED = '[AccountReport] DELETE_ACCOUNT_TRANSACTION_FAILED'
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

export class DeleteAccountTransactionAction implements Action {
  readonly type = AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION;

  constructor(public payload: {
    accountId: string,
    transactionId: string,
  }) {
  }
}

export class DeleteTransactionLoadedAction implements Action {
  readonly type = AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION_LOADED;

  constructor(public payload: {
    accountId: string,
    transactionId: string,
  }) {
  }
}

export class DeleteTransactionFailedAction implements Action {
  readonly type = AccountReportActionsTypes.DELETE_ACCOUNT_TRANSACTION_FAILED;

  constructor(public payload: {
    accountId: string,
    transactionId: string,
  }) {
  }
}

type AccountReportActions = LoadAccountReportAction
  | AccountReportLoaded
  | FailedLoadAccountReport
  | SortAccountTransactionsBySignificantAction
  | SortAccountTransactionsByRecentAction
  | DeleteAccountTransactionAction
  | DeleteTransactionLoadedAction
  | DeleteTransactionFailedAction
  ;

export {
  AccountReportActions
};
