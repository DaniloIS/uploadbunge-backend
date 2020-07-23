"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const knex_1 = __importDefault(require("knex"));
dotenv_1.default.config();
/*const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});*/
/*
  const connection = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'postgres',
      database : 'postgres',
      port: 5432
    },
    useNullAsDefault: true,
  });
*/
console.log('process.env.DATABASE_URL >> ', process.env.DATABASE_URL);
const connection = knex_1.default({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
});
exports.default = connection;
