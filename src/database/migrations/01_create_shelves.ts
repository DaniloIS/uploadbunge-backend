import Knex from 'knex';

export async function up(knex: Knex) {
    // Cria tabela
    return knex.schema.createTable('shelves', table => {
        table.increments('id').primary();
        table.string('shelf').notNullable();
        table.integer('rack').notNullable();
    });

}

export async function down(knex: Knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('shelves');
}