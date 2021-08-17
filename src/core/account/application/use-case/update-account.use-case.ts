import { AccountRepository } from '../../domain/repository/account.repository';
import { AccountDto } from '../dto/account.dto';
import { AccountModelManager } from '../../domain/model-manager/account.model-manager';
import { Injectable } from '@angular/core';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';

class AccountNotFoundException extends Error {
  constructor(id: string) {
    super(`AccountNotFoundException: account with id ${id} not found.`);
  }
}

class CannotEditAccountException extends Error {
  constructor(id: string) {
    super(`CannotEditAccountException: account with id ${id} can not be edited.`);
  }
}

interface UpdateAccountRequest {
  id: string;
  name: string;
}

interface UpdateAccountResponse {
  account: AccountDto;
}

@Injectable()
export class UpdateAccountsUseCase {
  constructor(
    private repository: AccountRepository,
    private modelManager: AccountModelManager,
    private authService: CredentialsService,
    ) {
  }

  public async exec(request: UpdateAccountRequest): Promise<UpdateAccountResponse> {
    const user = this.authService.extractCredentials();

    const account = await this.repository.findOne(request.id);

    if (!account) {
      throw new AccountNotFoundException(request.id);
    }

    if (account.getOwnerId() !== user.id) {
      throw new CannotEditAccountException(request.id);
    }

    account.rename(request.name);

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
