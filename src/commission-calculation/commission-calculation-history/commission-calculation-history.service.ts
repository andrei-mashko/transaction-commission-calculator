import { Injectable } from '@nestjs/common';
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
}
