import { DefaultModel } from '../../../shared/domain/model/default.model';

export class Account extends DefaultModel {
  constructor(
    public readonly id: string,
    private ownerId: string,
    private name: string,
    private readonly currencyId: string,
    private readonly createDate: Date
  ) {
    super();
  }

  public getId(): string {
    return this.id;
  }

  public getOwnerId(): string {
    return this.ownerId;
  }

  public getName(): string {
    return this.name;
  }

  public rename(name: string): void {
    this.name = name;
  }

  public getCurrencyId(): string {
    return this.currencyId;
  }

  public getCreateDate(): Date {
    return this.createDate;
  }
}
