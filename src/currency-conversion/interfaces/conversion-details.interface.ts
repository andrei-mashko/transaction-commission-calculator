import { MoneyAmount } from 'src/money-amount/money-amount';

export interface ConversionDetails {
  sourceCurrency: string;
  date: string;
  amount: MoneyAmount;
}
