import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MoneyAmount } from 'src/money-amount/money-amount';
import { Transaction } from './inrefaces/transaction.interface';

@Injectable()
export class CommissionCalculationHistoryRepository {
  constructor(@InjectKnex() private readonly knex: Knex) {}

  async saveTransaction({ amount, ...rest }: Transaction) {
    await this.knex('transaction_calculation_history').insert({
      ...rest,
      amount: amount.toFixedString(),
    });
  }

  async getClientTransactionTotalAmountInRange(
    clientId: number,
    startDate: string,
    endDate: string,
  ): Promise<MoneyAmount> {
    const { totalAmount } = await this.knex('transaction_calculation_history')
      .where({ clientId })
      .whereBetween('date', [startDate, endDate])
      .sum({ totalAmount: 'amount' })
      .first<{ totalAmount: string }>();

    return MoneyAmount.of(totalAmount);
  }
}
