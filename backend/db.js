const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => console.log('Connected to Heroku Postgres!'))
    .catch(err => console.error('Connection error', err.stack));


module.exports = pool;
