export default class Account {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly currencyId: string,
    public readonly createDate: Date
  ) {
  }
}
