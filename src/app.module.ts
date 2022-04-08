import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { LoggerModule } from 'nestjs-pino';

import { CommissionCalculationModule } from './commission-calculation/commission-calculation.module';
import { config } from './common/config';

@Module({
  imports: [
    LoggerModule.forRoot(),
    KnexModule.forRoot({
      config: config.DB_CONFIG,
    }),
    CommissionCalculationModule,
  ],
})
export class AppModule {}
