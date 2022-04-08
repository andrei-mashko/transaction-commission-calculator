import { Injectable } from '@nestjs/common';

import { CurrencyConversionService } from 'src/currency-conversion/currency-conversion.service';

import { CommissionCalculationHistoryService } from './commission-calculation-history/commission-calculation-history.service';
import { CommissionCalculatorService } from './commission-calculator/commission-calculator.service';
import { CalculateCommissionRequestDto } from './dto/calculateCommission.dto';

@Injectable()
export class CommissionCalculationService {
  constructor(
    private readonly commissionCalculatorService: CommissionCalculatorService,
    private readonly commissionCalculationHistoryService: CommissionCalculationHistoryService,
    private readonly currencyConversionService: CurrencyConversionService,
  ) {}

  async calculateCommission(transaction: CalculateCommissionRequestDto) {
    const targetCurrency = 'EUR';

    const convertedTransactionAmount =
      await this.currencyConversionService.convert({
        amount: transaction.amount,
        date: transaction.date,
        sourceCurrency: transaction.currency,
      });
    const commission =
      await this.commissionCalculatorService.calculateCommission({
        ...transaction,
        currency: targetCurrency,
        amount: convertedTransactionAmount,
      });

    await this.commissionCalculationHistoryService.saveTransaction({
      ...transaction,
      currency: targetCurrency,
      amount: convertedTransactionAmount,
    });

    return {
      amount: commission.toFixedString(),
      currency: targetCurrency,
    };
  }
}
