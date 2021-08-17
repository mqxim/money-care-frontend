import { AccountModelManager } from '../../domain/model-manager/account.model-manager';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';
import { Injectable } from '@angular/core';
import { AccountRepository } from '../../domain/repository/account.repository';

class FailedToDeleteAccountException extends Error {
  constructor() {
    super('FailedToDeleteAccountException: failed to delete the account.');
  }
}

export interface DeleteAccountRequest {
  id: string;
}

export interface DeleteAccountResponse {
  status: boolean;
}

@Injectable()
export class DeleteAccountUseCase {
  constructor(
    private authService: CredentialsService,
    private modelManager: AccountModelManager,
    private repo: AccountRepository,
  ) {
  }

  public async exec(request: DeleteAccountRequest): Promise<DeleteAccountResponse> {
    const user = this.authService.extractCredentials();

    const account = await this.repo.findOne(request.id);

    if (!account || (account.getOwnerId() !== user.id)) {
      throw new FailedToDeleteAccountException();
    }

    await this.modelManager.delete(account);

    return {
      status: true,
    };
  }
}
