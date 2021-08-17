import { DefaultModel } from '../../../shared/domain/model/default.model';

export class Currency extends DefaultModel {
  constructor(
    public readonly id: string,
    private readonly name: string,
    private readonly code: string,
    private usdRate: number
  ) {
    super();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getCode(): string {
    return this.code;
  }

  public getUSDRate(): number {
    return this.usdRate;
  }
}
