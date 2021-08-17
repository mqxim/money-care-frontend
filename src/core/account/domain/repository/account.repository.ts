import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { Account } from '../model/account.model';

export abstract class AccountRepository extends DefaultRepository<Account> {
  abstract async findByOwnerId(ownerId: string): Promise<Account[]>;
}
