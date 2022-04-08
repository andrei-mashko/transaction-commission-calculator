import { Knex } from 'knex';

export interface Transaction {
  id: string;
  clientId: number;
  amount: number;
  currency: string;
  date: Date;
}
declare module 'knex/types/tables' {
  interface Tables {
    transaction_calculation_history: Knex.CompositeTableType<
      // return type
      Omit<Transaction, 'amount'> & { amount: string },
      // "insert" type
      Omit<Transaction, 'date' | 'amount' | 'id'> & {
        amount: string | number;
        date: string;
      },
      // "update()" type
      Partial<Omit<Transaction, 'id'>>
    >;
  }
}
