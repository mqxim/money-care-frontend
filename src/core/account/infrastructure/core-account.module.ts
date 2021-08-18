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
import { TransactionRepository } from '../domain/repository/transaction.repository';
import { TransactionRepositoryImpl } from './persistence/indexedDB/repository/transaction.repository';
import { TransactionModelManagerImpl } from './persistence/indexedDB/model-manager/transaction.model-manager';
import { TransactionModelManager } from '../domain/model-manager/transaction.model-manager';
import { CreateTransactionUseCase } from '../application/use-case/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../application/use-case/delete-transaction.use-case';
import { GenerateAccountReportUseCase } from '../application/use-case/generate-account-report.use-case';
import { CategoryModelManager } from '../domain/model-manager/category.model-manager';
import { CategoryModelManagerImpl } from './persistence/indexedDB/model-manager/category.model-manager';
import { CategoryRepository } from '../domain/repository/category.repository';
import { CategoryRepositoryImpl } from './persistence/indexedDB/repository/category.repository';

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
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GenerateAccountReportUseCase,
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
    },
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
    {
      provide: TransactionModelManager,
      useClass: TransactionModelManagerImpl,
    },
    {
      provide: CategoryModelManager,
      useClass: CategoryModelManagerImpl,
    },
    {
      provide: CategoryRepository,
      useClass: CategoryRepositoryImpl,
    },
  ],
})
export class CoreAccountModule {
}
