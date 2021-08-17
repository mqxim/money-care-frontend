import { TransactionDto } from './transaction';
import { CurrencyDto } from './currency';
import { AccountDto } from './account';

export interface AccountReport {
  startDate: Date;
  endDate: Date;
  transactions: Array<TransactionDto>;
  currentBalance: number;
  incomes: number;
  expenses: number;
  periodBalance: number;
  account: AccountDto;
  currency: CurrencyDto;
}
