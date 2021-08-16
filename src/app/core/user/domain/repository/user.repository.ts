import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { User } from '../model/user.model';

export abstract class UserRepository extends DefaultRepository<User> {
  abstract findByEmail(email: string): Promise<User[] | null>;
}
