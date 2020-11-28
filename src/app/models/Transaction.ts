export default class Transaction {
  constructor(
    public transactionId: string,
    public accountId: string,
    public category: string,
    public cost: number,
    public comment: string,
    public createDate: Date
  ) {
  }
}
