import { CategoryModelManager } from '../../../../domain/model-manager/category.model-manager';
import { connect, STORES } from '../connect';
import { Category } from '../../../../domain/model/category.model';

export class CategoryModelManagerImpl extends CategoryModelManager {
  delete(model: Category): Promise<boolean> {
    return new Promise(async (resolve) => {
      const db = await connect();
      const categories = db.transaction(STORES.CATEGORY, 'readwrite').objectStore(STORES.CATEGORY);
      categories.delete(model.id);
      resolve(true);
    });
  }

  save(model: Category): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();
      const categories = db.transaction(STORES.CATEGORY, 'readwrite').objectStore(STORES.CATEGORY);
      const request = categories.put(model);

      request.addEventListener('error', (e) => {
        reject(e);
      });

      request.addEventListener('success', () => {
        resolve(model);
      });
    });
  }
}
