import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { Transaction } from '../model/transaction.model';

export abstract class TransactionRepository extends DefaultRepository<Transaction> {
}
