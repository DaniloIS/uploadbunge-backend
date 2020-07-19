"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    // Cria tabela
    return knex.schema.createTable('shelves', table => {
        table.increments('id').primary();
        table.string('shelf').notNullable();
        table.integer('rack').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('shelves');
}
exports.down = down;
