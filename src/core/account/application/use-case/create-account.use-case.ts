import { AccountDto } from '../dto/account.dto';
import { AccountModelManager } from '../../domain/model-manager/account.model-manager';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';
import { Account } from '../../domain/model/account.model';
import { Injectable } from '@angular/core';
import { RandomService } from '../../../shared/domain/service/random.service';

class CreateAccountException extends Error {
  constructor() {
    super('CreateAccountException: failed to create account.');
  }
}

export interface CreateAccountRequest {
  name: string;
  currencyId: string;
}

export interface CreateAccountResponse {
  account: AccountDto;
}

@Injectable()
export class CreateAccountUseCase {
  constructor(
    private authService: CredentialsService,
    private modelManager: AccountModelManager,
    private random: RandomService,
  ) {
  }

  public async exec(request: CreateAccountRequest): Promise<CreateAccountResponse> {
    const user = this.authService.extractCredentials();

    if (!user) {
      throw new CreateAccountException();
    }

    const account = new Account(
      this.random.makeId(),
      user.id,
      request.name,
      request.currencyId,
      new Date(),
    );

    const updated = await this.modelManager.save(account);

    return {
      account: {
        id: updated.id,
        name: updated.getName(),
        currencyId: updated.getCurrencyId(),
        createDate: updated.getCreateDate(),
      }
    };
  }
}
