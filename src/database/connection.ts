import dotenv from 'dotenv';
import knex from 'knex';
import path from 'path';

dotenv.config();
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
const connection = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
  });

export default connection;