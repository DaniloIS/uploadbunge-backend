import Knex from 'knex';

export async function up(knex: Knex) {
    // Cria tabela
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
    });

}

export async function down(knex: Knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('products');
}