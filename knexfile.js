import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
/*
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
        connectionString: process.env.DATABASE_URL
    },
    migrations: {
        directory: path.resolve(__dirname, 'dist', 'database', 'migrations')
    },
    useNullAsDefault: true,
};