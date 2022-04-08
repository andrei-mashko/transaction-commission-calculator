import { MoneyAmount } from 'src/money-amount/money-amount';
import { Transaction } from './transaction.interface';

export interface CommissionCalculationRule {
  calculateCommission(transaction: Transaction): Promise<MoneyAmount | null>;
}
