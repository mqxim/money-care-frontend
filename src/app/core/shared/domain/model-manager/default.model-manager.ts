import {DefaultModel} from '../model/default.model';

export abstract class DefaultModelManager<T extends DefaultModel> {
  public abstract save(model: T): Promise<T>;

  public abstract delete(model: T): Promise<boolean>;
}
