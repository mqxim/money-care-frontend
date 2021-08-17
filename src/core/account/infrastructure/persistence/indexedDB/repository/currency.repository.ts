import { CurrencyRepository } from '../../../../domain/repository/currency.repository';
import { Currency } from '../../../../domain/model/currency.model';

export class CurrencyRepositoryImpl extends CurrencyRepository {
  private readonly currencies = [
    new Currency('1', 'USD', '$', 1),
    new Currency('2', 'EUR', '€', 0.847),
    new Currency('3', 'RUB', '₽', 0.014),
  ];

  constructor() {
    super();
  }

  async findAll(): Promise<Currency[]> {
    return this.currencies;
  }

  async findOne(id: string): Promise<Currency | null> {
    return this.currencies.filter((c) => c.id === id).shift();
  }
}
