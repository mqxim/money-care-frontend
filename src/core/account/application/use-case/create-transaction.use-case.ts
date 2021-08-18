import { Transaction } from '../../domain/model/transaction.model';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { TransactionModelManager } from '../../domain/model-manager/transaction.model-manager';
import { Injectable } from '@angular/core';
import { RandomService } from '../../../shared/domain/service/random.service';

interface CreateTransactionRequest {
  accountId: string;
  date: Date;
  categoryId: string;
  cost: number;
  comment: string;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

@Injectable()
export class CreateTransactionUseCase {
  constructor(
    private repository: TransactionRepository,
    private modelManager: TransactionModelManager,
    private random: RandomService,
  ) {
  }

  public async exec(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const transaction = new Transaction(
      this.random.makeId(),
      request.accountId,
      request.categoryId,
      request.cost,
      request.comment,
      request.date,
    );

    const updated = await this.modelManager.save(transaction);

    return {
      transaction: new Transaction(
        updated.id,
        updated.getAccountId(),
        updated.getCategoryId(),
        updated.getCost(),
        updated.getComment(),
        updated.getCreateDate(),
      )
    };
  }
}
