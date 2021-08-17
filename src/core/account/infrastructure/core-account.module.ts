import { NgModule } from '@angular/core';
import { CurrencyRepository } from '../domain/repository/currency.repository';
import { CurrencyRepositoryImpl } from './persistence/indexedDB/repository/currency.repository';
import { FindCurrenciesUseCase } from '../application/use-case/find-currencies.use-case';
import { AccountRepository } from '../domain/repository/account.repository';
import { AccountRepositoryImpl } from './persistence/indexedDB/repository/account.repository';
import { FindAccountsUseCase } from '../application/use-case/find-accounts.use-case';
import { CoreSharedModule } from '../../shared/infrastructure/core-shared.module';
import { CreateAccountUseCase } from '../application/use-case/create-account.use-case';
import { AccountModelManager } from '../domain/model-manager/account.model-manager';
import { AccountModelManagerImpl } from './persistence/indexedDB/model-manager/account.model-manager';
import { UpdateAccountsUseCase } from '../application/use-case/update-account.use-case';
import { DeleteAccountUseCase } from '../application/use-case/delete-account.use-case';

@NgModule({
  imports: [
    CoreSharedModule,
  ],
  exports: [],
  providers: [
    FindCurrenciesUseCase,
    FindAccountsUseCase,
    CreateAccountUseCase,
    UpdateAccountsUseCase,
    DeleteAccountUseCase,
    {
      provide: CurrencyRepository,
      useClass: CurrencyRepositoryImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: AccountModelManager,
      useClass: AccountModelManagerImpl,
    }
  ],
})
export class CoreAccountModule {
}
