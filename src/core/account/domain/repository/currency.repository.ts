import { DefaultRepository } from '../../../shared/domain/repository/default.repository';
import { Currency } from '../model/currency.model';

export abstract class CurrencyRepository extends DefaultRepository<Currency> {
}
