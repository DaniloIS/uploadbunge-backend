"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    // Cria tabela
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.boolean('admin').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    // Volta atras (Deletar a tabela)
    return knex.schema.dropTable('users');
}
exports.down = down;
