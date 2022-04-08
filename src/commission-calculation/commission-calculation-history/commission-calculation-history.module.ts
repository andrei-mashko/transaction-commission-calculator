import { Module } from '@nestjs/common';
import { CommissionCalculationHistoryRepository } from './commission-calculation-history.repository';
import { CommissionCalculationHistoryService } from './commission-calculation-history.service';

@Module({
  providers: [
    CommissionCalculationHistoryService,
    CommissionCalculationHistoryRepository,
  ],
  exports: [CommissionCalculationHistoryService],
})
export class CommissionCalculationHistoryModule {}
