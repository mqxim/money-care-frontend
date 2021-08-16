import { NgModule } from '@angular/core';
import { UserRepository } from './domain/repository/user.repository';
import { UserRepositoryImpl } from './infrastructure/indexedDB/repository/user.repository';
import { UserModelManager } from './domain/model-manager/user.model-manager';
import { UserModelManagerImpl } from './infrastructure/indexedDB/model-manager/user.model-manager';
import { CreateUserUseCase } from './application/use-case/create-user.use-case';
import { SignInUseCase } from './application/use-case/sign-in.use-case';
import { UpdateUserUseCase } from './application/use-case/update-user.use-case';
import { CoreSharedModule } from '../shared/infrastructure/core-shared.module';

@NgModule({
  imports: [
    CoreSharedModule,
  ],
  exports: [],
  providers: [
    CreateUserUseCase,
    SignInUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: UserModelManager,
      useClass: UserModelManagerImpl
    }
  ],
})
export class CoreUserModule {
}
