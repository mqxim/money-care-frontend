import Transaction from './Transaction';
import Currency from './Currency';
import Account from './Account';

export default class AccountReport {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    public transactions: Array<Transaction>,
    public readonly currentBalance: number,
    public readonly incomes: number,
    public readonly expenses: number,
    public readonly periodBalance: number,
    public readonly account: Account,
    public readonly currency: Currency,
  ) {
  }

  sortRecent(): void {
    this.transactions = this.transactions.slice().sort((a, b) => {
      return a.cost < b.cost ? 1 : 0;
    });
  }

  sortSignificant(): void {
    this.transactions = this.transactions.slice().sort((a, b) => {
      return a.createDate < b.createDate ? 1 : 0;
    });
  }
}
