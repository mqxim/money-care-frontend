import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { Transaction } from '../model/transaction.model';

export abstract class TransactionRepository extends DefaultRepository<Transaction> {
  public abstract findTransactionForAccountBetweenDates({ id, dateStart, dateEnd }: {
    id: string,
    dateStart: Date,
    dateEnd: Date
  }): Promise<Transaction[]>;
}
