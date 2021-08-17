import { AccountRepository as AccountRepositoryInterface } from '../../../../domain/repository/account.repository';
import { Account } from '../../../../domain/model/account.model';
import { connect, STORES } from '../connect';

export class AccountRepositoryImpl extends AccountRepositoryInterface {
  constructor() {
    super();
  }

  async findAll(): Promise<Account[]> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();

      const request = db
        .transaction(STORES.ACCOUNT)
        .objectStore(STORES.ACCOUNT)
        .getAll();

      request.addEventListener('error', () => {
        reject(this.convertToDomainModel(request.result));
      });

      request.addEventListener('success', () => {
        resolve(this.convertToDomainModel(request.result));
      });
    });
  }

  async findOne(id: string): Promise<Account | null> {
    const accounts = await this.findAll();
    return accounts.filter((account) => account.id === id).shift();
  }

  async findByOwnerId(ownerId: string): Promise<Account[]> {
    const accounts = await this.findAll();
    return accounts.filter((account) => account.getOwnerId() === ownerId);
  }

  private convertToDomainModel(accounts: any[]): Account[] {
    return accounts.map((value) => new Account(
      value.hasOwnProperty('id') ? value.id : 0,
      value.hasOwnProperty('ownerId') ? value.ownerId : '',
      value.hasOwnProperty('name') ? value.name : '',
      value.hasOwnProperty('currencyId') ? value.currencyId : 0,
      value.hasOwnProperty('createDate') ? new Date(value.createDate) : new Date(),
    ));
  }
}
