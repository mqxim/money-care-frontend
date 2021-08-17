import { CurrencyDto } from '../dto/currency.dto';
import { CurrencyRepository } from '../../domain/repository/currency.repository';
import { Injectable } from '@angular/core';

interface FindCurrenciesResponse {
  currencies: CurrencyDto[];
}

@Injectable()
export class FindCurrenciesUseCase {
  constructor(
    private readonly currenciesRepository: CurrencyRepository
  ) {
  }

  public async exec(): Promise<FindCurrenciesResponse> {
    const currencies = await this.currenciesRepository.findAll();

    return {
      currencies: currencies.map((v) => ({
        id: v.getId(),
        name: v.getName(),
        code: v.getCode(),
        usdRate: v.getUSDRate(),
      }))
    };
  }
}
