"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    // Cria tabela
    return knex.schema.createTable('notifications', table => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.date('date').notNullable();
        table.boolean('viewed').notNullable();
        table.string('item_product_id').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('notifications');
}
exports.down = down;
