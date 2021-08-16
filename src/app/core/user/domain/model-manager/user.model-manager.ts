import { DefaultModelManager } from '../../../shared/domain/model-manager/default.model-manager';
import { User } from '../model/user.model';

export abstract class UserModelManager extends DefaultModelManager<User> {
}
