"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    // Cria tabela
    return knex.schema.createTable('products', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('products');
}
exports.down = down;
