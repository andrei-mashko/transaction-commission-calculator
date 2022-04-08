import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
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
}
