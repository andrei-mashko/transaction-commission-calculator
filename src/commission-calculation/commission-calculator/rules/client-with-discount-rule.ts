import { Injectable } from '@nestjs/common';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { CommissionCalculationRule } from '../interfaces/commission-calculation-rule.interface';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class ClientWithDiscountRule implements CommissionCalculationRule {
  async calculateCommission(
    transaction: Transaction,
  ): Promise<MoneyAmount | null> {
    const clientIdWithDiscount = 42;
    const commissionForClientWithDiscount = MoneyAmount.of(0.05);

    return transaction.clientId === clientIdWithDiscount
      ? commissionForClientWithDiscount
      : null;
  }
}
