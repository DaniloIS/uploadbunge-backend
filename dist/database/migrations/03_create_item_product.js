"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
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
exports.up = up;
async function down(knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('item_product');
}
exports.down = down;
