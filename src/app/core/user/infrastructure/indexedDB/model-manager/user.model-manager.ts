import { DefaultModelManager } from '../../../../shared/domain/model-manager/default.model-manager';
import { User } from '../../../domain/model/user.model';
import { connect, STORES } from '../connect';

export class UserModelManagerImpl extends DefaultModelManager<User> {
  constructor() {
    super();
  }

  async delete(model: User): Promise<boolean> {
    return new Promise(async (resolve) => {
      const db = await connect();
      const users = db.transaction(STORES.USER, 'readwrite').objectStore(STORES.USER);
      users.delete(model.id);
      resolve(true);
    });
  }

  async save(model: User): Promise<User> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();
      const users = db.transaction(STORES.USER, 'readwrite').objectStore(STORES.USER);
      const request = users.put(model);

      request.addEventListener('error', (e) => {
        reject(e);
      });

      request.addEventListener('success', () => {
        resolve(model);
      });
    });
  }
}
