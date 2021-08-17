import { TransactionRepository } from '../../../../domain/repository/transaction.repository';
import { Transaction } from '../../../../domain/model/transaction.model';
import { connect, STORES } from '../connect';

export class TransactionRepositoryImpl extends TransactionRepository {
  findAll(): Promise<Transaction[]> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();

      const request = db
        .transaction(STORES.TRANSACTION)
        .objectStore(STORES.TRANSACTION)
        .getAll();

      request.addEventListener('error', () => {
        reject(this.convertToDomainModel(request.result));
      });

      request.addEventListener('success', () => {
        resolve(this.convertToDomainModel(request.result));
      });
    });
  }

  async findOne(id: string): Promise<Transaction | null> {
    const transactions = await this.findAll();
    return transactions.filter((account) => account.id === id).shift();
  }

  private convertToDomainModel(transactions: any[]): Transaction[] {
    return transactions.map((v) => new Transaction(
      v.hasOwnProperty('id') ? v.id : 0,
      v.hasOwnProperty('accountId') ? v.accountId : 0,
      v.hasOwnProperty('categoryId') ? v.categoryId : 0,
      v.hasOwnProperty('cost') ? v.cost : 0,
      v.hasOwnProperty('comment') ? v.comment : '',
      v.hasOwnProperty('createDate') ? new Date(v.createDate) : new Date(),
    ));
  }

  async findTransactionForAccountBetweenDates({ id, dateStart, dateEnd }:
                                          { id: string; dateStart: Date; dateEnd: Date }): Promise<Transaction[]> {
    return this.findAll()
      .then((all) => all.filter((acc) => acc.getAccountId() === id))
      .then((other) => other.filter((d1) => d1.getCreateDate().getTime() >= dateStart.getTime()))
      .then((other) =>
        other.filter((d1) => d1.getCreateDate().getTime() <= dateEnd.getTime()))
      ;
  }
}
