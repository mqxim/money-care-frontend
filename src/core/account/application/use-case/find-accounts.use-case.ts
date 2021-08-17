import { AccountRepository } from '../../domain/repository/account.repository';
import { Account } from '../dto/Account';
import { Injectable } from '@angular/core';

interface FindAccountsRequest {
  ownerId: string;
}

interface FindAccountsResponse {
  accounts: Account[];
}

@Injectable()
export class FindAccountsUseCase {
  constructor(
    private repository: AccountRepository,
  ) {
  }

  public async exec(request: FindAccountsRequest): Promise<FindAccountsResponse> {
    const accounts = await this.repository.findByOwnerId(request.ownerId);

    return {
      accounts: accounts.map((a) => ({
        id: a.id,
        name: a.getName(),
        currencyId: a.getCurrencyId(),
        createDate: a.getCreateDate(),
      }))
    };
  }
}
