import { Injectable } from '@nestjs/common';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { CommissionCalculationHistoryRepository } from './commission-calculation-history.repository';
import { Transaction } from './inrefaces/transaction.interface';

@Injectable()
export class CommissionCalculationHistoryService {
  constructor(
    private readonly commissionCalculationHistoryRepository: CommissionCalculationHistoryRepository,
  ) {}

  async saveTransaction(transactionDetails: Transaction) {
    await this.commissionCalculationHistoryRepository.saveTransaction(
      transactionDetails,
    );
  }

  async getClientTransactionTotalAmountInRange(
    clientId: number,
    startDate: string,
    endDate: string,
  ): Promise<MoneyAmount> {
    return await this.commissionCalculationHistoryRepository.getClientTransactionTotalAmountInRange(
      clientId,
      startDate,
      endDate,
    );
  }
}
