import { TransactionModelManager } from '../../../../domain/model-manager/transaction.model-manager';
import { Transaction } from '../../../../domain/model/transaction.model';
import { connect, STORES } from '../connect';

export class TransactionModelManagerImpl extends TransactionModelManager {
  delete(model: Transaction): Promise<boolean> {
    return new Promise(async (resolve) => {
      const db = await connect();
      const transactions = db.transaction(STORES.TRANSACTION, 'readwrite').objectStore(STORES.TRANSACTION);
      transactions.delete(model.id);
      resolve(true);
    });
  }

  save(model: Transaction): Promise<Transaction> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();
      const transactions = db.transaction(STORES.TRANSACTION, 'readwrite').objectStore(STORES.TRANSACTION);
      const request = transactions.put(model);

      request.addEventListener('error', (e) => {
        reject(e);
      });

      request.addEventListener('success', () => {
        resolve(model);
      });
    });
  }
}
