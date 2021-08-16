import { DefaultModel } from '../model/default.model';

export abstract class DefaultRepository <T extends DefaultModel> {
  abstract findOne(id: string): Promise<T | null>;

  abstract findAll(): Promise<T[]>;
}
