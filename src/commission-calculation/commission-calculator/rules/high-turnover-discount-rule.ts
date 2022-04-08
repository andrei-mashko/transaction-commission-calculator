import { Injectable } from '@nestjs/common';
import * as _date from 'date-fns';

import { CommissionCalculationHistoryService } from 'src/commission-calculation/commission-calculation-history/commission-calculation-history.service';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { CommissionCalculationRule } from '../interfaces/commission-calculation-rule.interface';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class HighTurnoverDiscountRule implements CommissionCalculationRule {
  constructor(
    private readonly commissionCalculationHistoryService: CommissionCalculationHistoryService,
  ) {}

  async calculateCommission(
    transaction: Transaction,
  ): Promise<MoneyAmount | null> {
    const highTransactionTurnover = MoneyAmount.of(1000);
    const discountTransactionCommission = MoneyAmount.of(0.03);

    const clientTotalTransactionAmountInCurrentMonth =
      await this.getClientTotalAmountInCurrentMonth(
        transaction.clientId,
        transaction.date,
      );

    return clientTotalTransactionAmountInCurrentMonth.isBiggerOrEqualThan(
      highTransactionTurnover,
    )
      ? discountTransactionCommission
      : null;
  }

  private async getClientTotalAmountInCurrentMonth(
    clientId: number,
    date: string,
  ): Promise<MoneyAmount> {
    const dateObj = new Date(date);
    const startOfMonth = _date.startOfMonth(dateObj).toISOString();
    const endOfMonth = _date.endOfMonth(dateObj).toISOString();

    return await this.commissionCalculationHistoryService.getClientTransactionTotalAmountInRange(
      clientId,
      startOfMonth,
      endOfMonth,
    );
  }
}
