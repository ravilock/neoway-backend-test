import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex('taxIds').where('deleted', true).del();

    await knex.schema.alterTable('taxIds', function (table) {
        table.dropColumn('deleteAt');
        table.dropColumn('deleted');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('taxIds', function (table) {
        table.date('deleteAt').nullable().defaultTo(null);
        table.boolean('deleted').nullable().defaultTo(false);
    });
}
