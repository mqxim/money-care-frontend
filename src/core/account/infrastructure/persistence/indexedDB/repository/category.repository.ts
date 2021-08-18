import { CategoryRepository } from '../../../../domain/repository/category.repository';
import { Category } from '../../../../domain/model/category.model';
import { connect, STORES } from '../connect';

export class CategoryRepositoryImpl extends CategoryRepository {
  findAll(): Promise<Category[]> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();

      const request = db
        .transaction(STORES.CATEGORY)
        .objectStore(STORES.CATEGORY)
        .getAll();

      request.addEventListener('error', () => {
        reject(this.convertToDomainModel(request.result));
      });

      request.addEventListener('success', () => {
        resolve(this.convertToDomainModel(request.result));
      });
    });
  }

  findOne(id: string): Promise<Category | null> {
    return this.findAll()
      .then((all) => all.filter((one) => one.id === id).shift());
  }

  private convertToDomainModel(categories: any[]): Category[] {
    return categories.map((c) => new Category(
      Object.prototype.hasOwnProperty.call(c, 'id') ? c.id : 0,
      Object.prototype.hasOwnProperty.call(c, 'name') ? c.name : 0,
      Object.prototype.hasOwnProperty.call(c, 'color') ? c.color : 0,
    ));
  }
}
