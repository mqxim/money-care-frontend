import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { Category } from '../model/category.model';

export abstract class CategoryRepository extends DefaultRepository<Category> {
}
