import { TransactionModelManager } from '../../domain/model-manager/transaction.model-manager';
import { TransactionRepository } from '../../domain/repository/transaction.repository';
import { Injectable } from '@angular/core';

interface DeleteTransactionRequest {
  id: string;
}

interface DeleteTransactionResponse {
  status: boolean;
}

@Injectable()
export class DeleteTransactionUseCase {
  constructor(
    private modelManager: TransactionModelManager,
    private repository: TransactionRepository,
  ) {
  }

  public async exec(request: DeleteTransactionRequest): Promise<DeleteTransactionResponse> {
    const transaction = await this.repository.findOne(request.id);

    if (transaction) {
      await this.modelManager.delete(transaction);
    } else {
      return {
        status: false,
      };
    }

    return {
      status: true,
    };
  }
}
