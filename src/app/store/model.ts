export class Account {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly currencyId: string,
    public readonly createDate: Date
  ) {
  }
}

export class AccountReport {
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
}

export class Currency {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly code: string,
    public readonly usdRate: number
  ) {
  }
}

export class Transaction {
  constructor(
    public transactionId: string,
    public accountId: string,
    public category: string,
    public cost: number,
    public comment: string,
    public createDate: Date
  ) {
  }
}

export class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
  }

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}


