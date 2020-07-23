/*import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'dist', 'database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};

module.exports = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL
    },
    migrations: {
        directory: path.resolve(__dirname, 'dist', 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};*/
module.exports = {
    client: 'pg',
    connection: {
        connectionString: 'postgres://usdnmrezutwscu:24671409b9402d6c28e071d0a00a6127b4d8562e7651970981430474efa14478@ec2-52-200-48-116.compute-1.amazonaws.com:5432/d2c1b2bp8h7oum'
    },
    migrations: {
        directory: 'dist/database/migrations'
    },
    useNullAsDefault: true,
};