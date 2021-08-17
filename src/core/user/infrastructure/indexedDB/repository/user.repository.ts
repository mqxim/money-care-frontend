import { UserRepository } from '../../../domain/repository/user.repository';
import { User } from '../../../domain/model/user.model';
import { connect, STORES } from '../connect';

export class UserRepositoryImpl extends UserRepository {
  async findAll(): Promise<User[]> {
    return new Promise(async (resolve, reject) => {
      const db = await connect();

      const transaction = db.transaction(STORES.USER);

      const users = await transaction.objectStore(STORES.USER)
        .getAll();

      users.addEventListener('success', () => {
        resolve(this.convertToDomainModel(users.result));
      });

      users.addEventListener('success', () => {
        resolve(this.convertToDomainModel(users.result));
      });

      users.addEventListener('error', () => {
        reject(null);
      });
    });
  }

  async findOne(id: string): Promise<User | null> {
    const usersWithSameId = (await this.findAll()).filter((u) => u.id === id);

    return usersWithSameId.length >= 1 ? usersWithSameId[0] : null;
  }

  async findByEmail(email: string): Promise<User[] | null> {
    return (await this.findAll()).filter((u) => u.getEmail() === email);
  }

  private convertToDomainModel(users: any[]): User[] {
    return users.map((value) => new User(
      value.hasOwnProperty('id') ? value.id : 0,
      value.hasOwnProperty('email') ? value.email : '',
      value.hasOwnProperty('firstName') ? value.firstName : '',
      value.hasOwnProperty('lastName') ? value.lastName : '',
      value.hasOwnProperty('passwordHash') ? value.passwordHash : '',
    ));
  }
}
