import { DefaultModelManager } from '../../../shared/domain/model-manager/default.model-manager';
import { Transaction } from '../model/transaction.model';

export abstract class TransactionModelManager extends DefaultModelManager<Transaction> {
}
