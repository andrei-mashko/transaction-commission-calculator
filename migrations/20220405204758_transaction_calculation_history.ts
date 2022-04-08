import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transaction_calculation_history', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.integer('clientId').notNullable();
    table.index('clientId');
    table.decimal('amount', 19, 4).notNullable();
    table.string('currency').notNullable();
    table.dateTime('date', { useTz: false }).notNullable();
    table.index('date');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('transaction_calculation_history');
}
