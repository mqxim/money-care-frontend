import { DefaultModel } from '../../../shared/domain/model/default.model';

export class User extends DefaultModel {
  constructor(
    public readonly id: string,
    private email: string,
    private firstName: string,
    private lastName: string,
    private passwordHash: string,
  ) {
    super();
  }

  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public changeEmail(email: string): User {
    this.email = email;
    return this;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public rename(firstName: string, lastName: string): User {
    this.firstName = firstName;
    this.lastName = lastName;
    return this;
  }

  public comparePassword(password: string): boolean {
    return this.passwordHash === password;
  }

  public changePassword(password: string): User {
    this.passwordHash = password;
    return this;
  }
}
