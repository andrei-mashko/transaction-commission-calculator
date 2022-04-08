import { MoneyAmount } from 'src/money-amount/money-amount';

export interface Transaction {
  date: string;
  amount: MoneyAmount;
  currency: string;
  clientId: number;
}
