import { Module } from '@nestjs/common';
import { CommissionCalculationHistoryModule } from '../commission-calculation-history/commission-calculation-history.module';
import { CommissionCalculatorService } from './commission-calculator.service';
import { ClientWithDiscountRule } from './rules/client-with-discount-rule';
import { DefaultPricingRule } from './rules/default-pricing-rule';
import { HighTurnoverDiscountRule } from './rules/high-turnover-discount-rule';

@Module({
  imports: [CommissionCalculationHistoryModule],
  providers: [
    CommissionCalculatorService,
    DefaultPricingRule,
    ClientWithDiscountRule,
    HighTurnoverDiscountRule,
  ],
  exports: [CommissionCalculatorService],
})
export class CommissionCalculatorModule {}
