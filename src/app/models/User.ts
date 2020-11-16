export default class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
  ) {
  }

  public getFullName(): string {
    return this.firstName + ' ' + this.lastName;
  }
}
