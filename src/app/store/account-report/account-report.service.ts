import { Injectable } from '@angular/core';
import { Currency, Account, AccountReport, Transaction } from '../model';
import { CreateTransactionUseCase } from '../../../core/account/application/use-case/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../../../core/account/application/use-case/delete-transaction.use-case';
import { GenerateAccountReportUseCase } from '../../../core/account/application/use-case/generate-account-report.use-case';

@Injectable({
  providedIn: 'root'
})
export class AccountReportService {
  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private deleteTransactionUseCase: DeleteTransactionUseCase,
    private generateReportUseCase: GenerateAccountReportUseCase
  ) {
  }

  public createTransaction(transactInfo: {
    accountId: string,
    date: Date,
    categoryId: string,
    cost: number,
    comment: string,
  }): Promise<boolean> {
    return this.createTransactionUseCase.exec({
      accountId: transactInfo.accountId,
      date: transactInfo.date,
      categoryId: transactInfo.categoryId,
      cost: transactInfo.cost,
      comment: transactInfo.comment,
    })
      .then(() => true);
  }

  public deleteTransaction(transactInfo: {
    accountId: string,
    transactionId: string,
  }): Promise<boolean> {
    return this.deleteTransactionUseCase.exec({
      id: transactInfo.transactionId,
    })
      .then((response) => response.status);
  }

  public getAccountReport(
    accountReportQuery: {
      accountId: string,
      startDate: string,
      endDate: string
    }
  ): Promise<AccountReport> {
    return this.generateReportUseCase.exec({
      accountId: accountReportQuery.accountId,
      dateStart: new Date(accountReportQuery.startDate),
      dateEnd: new Date(accountReportQuery.endDate),
    })
      .then((response): AccountReport => {
        return {
          startDate: response.startDate,
          endDate: response.endDate,
          currentBalance: response.currentBalance,
          incomes: response.incomes,
          expenses: response.expenses,
          periodBalance: response.periodBalance,
          transactions: response.transactions.map((t) => new Transaction(
            t.id, t.accountId, t.categoryId, t.categoryName, t.categoryColor, t.cost, t.comment, t.createDate,
          )),
          account: new Account(
            response.account.id,
            response.account.name,
            response.account.currencyId,
            new Date(response.account.createDate)
          ),
          currency: new Currency(
            response.currency.id,
            response.currency.name,
            response.currency.code,
            response.currency.usdRate,
          )
        };
      });
  }
}
