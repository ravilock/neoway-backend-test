import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('taxIds', function (table) {
        table.primary(['uuid']);
        table.string('uuid').notNullable().unique();
        table.string('taxId').notNullable().unique();
        table.string('accountName').notNullable();
        table.date('startDate').notNullable();
        table.date('createdAt').notNullable().defaultTo(knex.fn.now());
        table.date('updatedAt').notNullable().defaultTo(knex.fn.now());
        table.date('deleteAt').nullable().defaultTo(null);
        table.boolean('deleted').nullable().defaultTo(false);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('taxIds');
}
