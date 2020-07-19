import Knex from 'knex';

export async function up(knex: Knex) {
    // Cria tabela
    return knex.schema.createTable('item_product', table => {
        table.increments('id').primary();

        table.integer('shelf_id')
            .notNullable()
            .references('id')
            .inTable('shelves');

        table.integer('product_id')
            .notNullable()
            .references('id')
            .inTable('products');

        table.integer('lot').notNullable();
        table.date('fabrication_dt').notNullable();
        table.date('expiration_dt').notNullable();
        table.float('color').notNullable();
        table.string('carousel').notNullable();
        table.boolean('expired');
    });

}

export async function down(knex: Knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('item_product');
}