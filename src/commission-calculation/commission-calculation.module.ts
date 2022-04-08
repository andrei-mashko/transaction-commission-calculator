import { Module } from '@nestjs/common';
import { CommissionCalculationController } from './commission-calculation.controller';
import { CommissionCalculatorModule } from './commission-calculator/commission-calculator.module';
import { CommissionCalculationService } from './commission-calculation.service';
import { CurrencyConversionModule } from 'src/currency-conversion/currency-conversion.module';
import { CommissionCalculationHistoryModule } from './commission-calculation-history/commission-calculation-history.module';

@Module({
  imports: [
    CommissionCalculatorModule,
    CurrencyConversionModule,
    CommissionCalculationHistoryModule,
  ],
  controllers: [CommissionCalculationController],
  providers: [CommissionCalculationService],
})
export class CommissionCalculationModule {}
