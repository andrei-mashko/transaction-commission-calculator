import { Inject, Injectable } from '@nestjs/common';

import { AppError, GET_ERROR_BODY_FN } from 'src/common/errors';
import { MoneyAmount } from 'src/money-amount/money-amount';

import { ConversionDetails } from './interfaces/conversion-details.interface';
import {
  CONVERSION_RATES_PROVIDER,
  ConversionRatesProvider,
} from './interfaces/conversion-rates-provider.interface';

@Injectable()
export class CurrencyConversionService {
  constructor(
    @Inject(CONVERSION_RATES_PROVIDER)
    private readonly conversionRatesProvider: ConversionRatesProvider,
  ) {}

  async convert(conversionDetails: ConversionDetails): Promise<MoneyAmount> {
    const currencyToRate = await this.conversionRatesProvider.getCurrencyToRate(
      conversionDetails.date,
    );
    const rate = currencyToRate[conversionDetails.sourceCurrency];
    if (!rate) {
      throw new AppError([
        GET_ERROR_BODY_FN.NOT_SUPPORTED_CURRENCY(
          conversionDetails.sourceCurrency,
        ),
      ]);
    }

    return conversionDetails.amount.divide(rate).toFixed();
  }
}
