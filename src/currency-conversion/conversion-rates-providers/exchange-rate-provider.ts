import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import * as memoizee from 'memoizee';

import { config } from 'src/common/config';
import { ConversionRatesProvider } from '../interfaces/conversion-rates-provider.interface';
import { CurrencyToRate } from '../interfaces/currency-to-rate.interface';

@Injectable()
export class ExchangeRateProvider implements ConversionRatesProvider {
  constructor(private readonly httpService: HttpService) {}

  async getCurrencyToRate(date: string): Promise<CurrencyToRate> {
    return this.loadRatesMemoized(date);
  }

  private loadRatesMemoized = memoizee(this.loadRates.bind(this), {
    promise: true,
    max: config.EXCHANGE_RATE_API_CACHE_MAX_RESULTS,
  });

  private async loadRates(date: string): Promise<CurrencyToRate> {
    const response = await lastValueFrom(
      this.httpService.get<{
        base: string;
        date: string;
        historical: boolean;
        motd: Record<string, string>;
        rates: Record<string, number>;
        success: boolean;
      }>(`${config.EXCHANGE_RATE_API_URL}/${date}`),
    );
    return response.data.rates;
  }
}
