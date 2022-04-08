import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CONVERSION_RATES_PROVIDER } from './interfaces/conversion-rates-provider.interface';
import { ExchangeRateProvider } from './conversion-rates-providers/exchange-rate-provider';
import { CurrencyConversionService } from './currency-conversion.service';

@Module({
  imports: [HttpModule],
  providers: [
    CurrencyConversionService,
    {
      provide: CONVERSION_RATES_PROVIDER,
      useClass: ExchangeRateProvider,
    },
  ],
  exports: [CurrencyConversionService],
})
export class CurrencyConversionModule {}
