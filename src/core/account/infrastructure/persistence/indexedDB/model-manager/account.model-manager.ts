import { AccountModelManager } from '../../../../domain/model-manager/account.model-manager';
import { Account } from '../../../../domain/model/account.model';
import { connect, STORES } from '../connect';

export class AccountModelManagerImpl extends AccountModelManager {
  delete(model: Account): Promise<boolean> {
    return new Promise(async (resolve) => {
      const db = await connect();
      const account = db.transaction(STORES.ACCOUNT, 'readwrite').objectStore(STORES.ACCOUNT);
      account.delete(model.id);
      resolve(true);
    });
  }

  save(model: Account): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();
      const accounts = db.transaction(STORES.ACCOUNT, 'readwrite').objectStore(STORES.ACCOUNT);
      const request = accounts.put(model);

      request.addEventListener('error', (e) => {
        reject(e);
      });

      request.addEventListener('success', () => {
        resolve(model);
      });
    });
  }
}
