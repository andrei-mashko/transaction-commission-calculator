import { Module } from '@nestjs/common';
import { CommissionCalculatorService } from './commission-calculator.service';
import { ClientWithDiscountRule } from './rules/client-with-discount-rule';
import { DefaultPricingRule } from './rules/default-pricing-rule';

@Module({
  providers: [
    CommissionCalculatorService,
    DefaultPricingRule,
    ClientWithDiscountRule,
  ],
  exports: [CommissionCalculatorService],
})
export class CommissionCalculatorModule {}
