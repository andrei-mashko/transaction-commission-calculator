import { Injectable } from '@nestjs/common';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { CommissionCalculationRule } from '../interfaces/commission-calculation-rule.interface';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable()
export class DefaultPricingRule implements CommissionCalculationRule {
  async calculateCommission(
    transaction: Transaction,
  ): Promise<MoneyAmount | null> {
    const fiveTenthsPercentOfAmount = transaction.amount
      .multiply(0.5)
      .divide(100);
    const minAllowedValue = MoneyAmount.of(0.05);

    return fiveTenthsPercentOfAmount.isBiggerOrEqualThan(minAllowedValue)
      ? fiveTenthsPercentOfAmount
      : minAllowedValue;
  }
}
