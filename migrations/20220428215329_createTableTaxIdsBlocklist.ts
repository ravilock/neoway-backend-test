import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('taxIdsBlocklist', function (table) {
        table.primary(['taxId']);
        table.string('taxId').notNullable().index();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('taxIdsBlocklist');
}
