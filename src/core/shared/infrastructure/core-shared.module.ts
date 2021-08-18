import { NgModule } from '@angular/core';
import { CredentialsService } from '../domain/service/credentials.service';
import { RandomService } from '../domain/service/random.service';
import { RandomServiceImpl } from './service/random.service';
import { Base64Service } from '../domain/service/base64.service';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    CredentialsService,
    Base64Service,
    {
      provide: RandomService,
      useClass: RandomServiceImpl,
    }
  ],
})
export class CoreSharedModule {
}
