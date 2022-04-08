import { CurrencyToRate } from './currency-to-rate.interface';

export interface ConversionRatesProvider {
  getCurrencyToRate(date: string): Promise<CurrencyToRate>;
}
export const CONVERSION_RATES_PROVIDER = Symbol();
