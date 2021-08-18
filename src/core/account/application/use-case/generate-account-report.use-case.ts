import { TransactionDto } from '../dto/transaction.dto';
import { AccountDto } from '../dto/account.dto';
import { CurrencyDto } from '../dto/currency.dto';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { AccountRepository } from '../../domain/repository/account.repository';
import { CurrencyRepository } from '../../domain/repository/currency.repository';
import { CredentialsService } from '../../../shared/domain/service/credentials.service';
import { Injectable } from '@angular/core';
import { CategoryRepository } from '../../domain/repository/category.repository';

class GenerateAccountReportException extends Error {
  constructor() {
    super('GenerateAccountReportException: failed to generate report.');
  }
}

interface GenerateAccountReportRequest {
  accountId: string;
  dateStart: Date;
  dateEnd: Date;
}

interface GenerateAccountReportResponse {
  startDate: Date;
  endDate: Date;
  transactions: TransactionDto[];
  currentBalance: number;
  incomes: number;
  expenses: number;
  periodBalance: number;
  account: AccountDto;
  currency: CurrencyDto;
}

@Injectable()
export class GenerateAccountReportUseCase {
  constructor(
    private readonly accountsRepository: AccountRepository,
    private readonly transactionsRepository: TransactionRepository,
    private readonly currencyRepository: CurrencyRepository,
    private readonly authService: CredentialsService,
    private readonly categoryRepository: CategoryRepository,
  ) {
  }

  public async exec(request: GenerateAccountReportRequest): Promise<GenerateAccountReportResponse> {
    const user = this.authService.extractCredentials();

    const account = await this.accountsRepository.findOne(request.accountId);

    if (!account || account.getOwnerId() !== user.id) {
      throw new GenerateAccountReportException();
    }

    const transactions = await this.transactionsRepository.findTransactionForAccountBetweenDates({
      id: request.accountId,
      dateStart: request.dateStart,
      dateEnd: request.dateEnd,
    });

    const currency = await this.currencyRepository.findOne(account.getCurrencyId());

    const categories = await this.categoryRepository.findAll();

    const currentBalance = (await this.transactionsRepository.findTransactionForAccountBetweenDates({
      id: request.accountId,
      dateStart: new Date(0),
      dateEnd: new Date(),
    })).map((t) => t.getCost()).reduce((a, b) => a + b, 0);

    return {
      startDate: request.dateStart,
      endDate: request.dateEnd,
      transactions: transactions.map((t) => ({
        id: t.id,
        accountId: t.getAccountId(),
        categoryId: t.getCategoryId(),
        cost: t.getCost(),
        comment: t.getComment(),
        createDate: t.getCreateDate(),
        categoryName: categories.filter((c) => c.id === t.getCategoryId()).shift()?.getName() ?? 'Unknown',
        categoryColor: categories.filter((c) => c.id === t.getCategoryId()).shift()?.getColor() ?? '#000',
      })),
      currentBalance,
      incomes:
        transactions
          .map((t) => t.getCost())
          .filter((t) => t > 0)
          .reduce((a, b) => a + b, 0),
      expenses:
        transactions
          .map((t) => t.getCost())
          .filter((t) => t < 0)
          .reduce((a, b) => a + b, 0),
      periodBalance:
        transactions
          .map((t) => t.getCost())
          .reduce((a, b) => a + b, 0),
      account: {
        id: account.id,
        name: account.getName(),
        currencyId: account.getCurrencyId(),
        createDate: account.getCreateDate(),
      },
      currency: {
        id: currency.id,
        name: currency.getName(),
        code: currency.getCode(),
        usdRate: currency.getUSDRate(),
      }
    };
  }
}
