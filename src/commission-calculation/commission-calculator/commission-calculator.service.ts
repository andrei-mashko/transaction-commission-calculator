import { Injectable } from '@nestjs/common';

import { MoneyAmount } from 'src/money-amount/money-amount';
import { AppError, GET_ERROR_BODY_FN } from 'src/common/errors';

import { ClientWithDiscountRule } from './rules/client-with-discount-rule';
import { CommissionCalculationRule } from './interfaces/commission-calculation-rule.interface';
import { DefaultPricingRule } from './rules/default-pricing-rule';
import { Transaction } from './interfaces/transaction.interface';
import { HighTurnoverDiscountRule } from './rules/high-turnover-discount-rule';

@Injectable()
export class CommissionCalculatorService {
  private readonly commissionCalculationRules: Array<CommissionCalculationRule> =
    [];

  constructor(
    private readonly clientWithDiscountRule: ClientWithDiscountRule,
    private readonly defaultPricingRule: DefaultPricingRule,
    private readonly highTurnoverDiscountRule: HighTurnoverDiscountRule,
  ) {
    this.commissionCalculationRules.push(
      this.clientWithDiscountRule,
      this.defaultPricingRule,
      this.highTurnoverDiscountRule,
    );
  }

  async calculateCommission(transaction: Transaction): Promise<MoneyAmount> {
    const commissionAmounts = (
      await Promise.all(
        this.commissionCalculationRules.map((rule) =>
          rule.calculateCommission(transaction),
        ),
      )
    ).filter((commissionAmount) => commissionAmount !== null);

    if (commissionAmounts.length === 0) {
      throw new AppError([
        GET_ERROR_BODY_FN.NO_APPLIED_COMMISSION_CALCULATION_RULES(),
      ]);
    }

    return MoneyAmount.getMin(commissionAmounts).toFixed();
  }
}
