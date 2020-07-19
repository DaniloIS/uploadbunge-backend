import Knex from 'knex';

export async function up(knex: Knex) {
    // Cria tabela
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('admin').notNullable();
    });

}

export async function down(knex: Knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('users');
}