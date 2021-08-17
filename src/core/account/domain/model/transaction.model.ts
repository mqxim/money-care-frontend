import { DefaultModel } from '../../../shared/domain/model/default.model';

export class Transaction extends DefaultModel {
  constructor(
    public readonly id: string,
    private readonly accountId: string,
    private categoryId: string,
    private cost: number,
    private comment: string,
    private readonly createDate: Date
  ) {
    super();
  }

  public getId(): string {
    return this.id;
  }

  public getAccountId(): string {
    return this.accountId;
  }

  public getCategoryId(): string {
    return this.categoryId;
  }

  public changeCategoryId(id: string): Transaction {
    this.categoryId = id;
    return this;
  }

  public getCost(): number {
    return this.cost;
  }

  public changeCost(cost: number): Transaction {
    this.cost = cost;
    return this;
  }

  public getComment(): string {
    return this.comment;
  }

  public changeComment(comment: string): Transaction {
    this.comment = comment;
    return this;
  }

  public getCreateDate(): Date {
    return this.createDate;
  }
}
