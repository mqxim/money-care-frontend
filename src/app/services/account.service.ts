import BaseService from './base.service';
import Account from '../models/Account';
import Currency from '../models/Currency';
import { FindCurrenciesUseCase } from '../../core/account/application/use-case/find-currencies.use-case';
import { FindAccountsUseCase } from '../../core/account/application/use-case/find-accounts.use-case';
import { CredentialsService } from '../../core/shared/domain/service/credentials.service';
import { CreateAccountUseCase } from '../../core/account/application/use-case/create-account.use-case';
import { UpdateAccountsUseCase } from '../../core/account/application/use-case/update-account.use-case';
import { DeleteAccountUseCase } from '../../core/account/application/use-case/delete-account.use-case';

import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export default class AccountService extends BaseService {
  constructor(
    private authService: CredentialsService,
    private findCurrencyUseCase: FindCurrenciesUseCase,
    private findAccountsUseCase: FindAccountsUseCase,
    private createAccountUseCase: CreateAccountUseCase,
    private updateAccountUseCase: UpdateAccountsUseCase,
    private deleteAccountUseCase: DeleteAccountUseCase,
  ) {
    super();
  }

  public getUserAccounts(): Promise<Account[]> {
    const credentials = this.authService.extractCredentials();

    return this.findAccountsUseCase.exec({ ownerId: credentials.id })
      .then(
        (response) => response.accounts.map((a) =>
          new Account(a.id, a.name, a.currencyId, a.createDate)
        )
      );
  }

  public createAccount(name: string, currencyId: string): Promise<Account> {
    return this.createAccountUseCase.exec({
      currencyId, name
    })
      .then((response) => new Account(
        response.account.id,
        response.account.name,
        response.account.currencyId,
        response.account.createDate,
      ));
  }

  public getCurrencies(): Promise<Currency[]> {
    return this.findCurrencyUseCase.exec()
      .then((response) =>
        response.currencies.map((c) => new Currency(c.id, c.name, c.code, c.usdRate)
        )
      );
  }

  public deleteAccount(accountId: string): Promise<boolean> {
    return this.deleteAccountUseCase.exec({
      id: accountId,
    })
      .then((response) => response.status);
  }

  public renameAccount(accountId: string, newName: string): Promise<Account> {
    return this.updateAccountUseCase.exec({
      id: accountId,
      name: newName,
    }).then((response) => new Account(
      response.account.id,
      response.account.name,
      response.account.currencyId,
      response.account.createDate,
    ));
  }
}
