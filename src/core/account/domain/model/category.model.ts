import { DefaultModel } from '../../../shared/domain/model/default.model';

export class Category extends DefaultModel {
  constructor(
    public readonly id: string,
    private name: string,
    private color: string,
  ) {
    super();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public rename(name: string): Category {
    this.name = name;
    return this;
  }

  public getColor(): string {
    return this.color;
  }

  public changeColor(color: string): Category {
    this.color = color;
    return this;
  }
}
