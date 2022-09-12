const { Pool } = require('pg');

const db = new Pool({
    host : "localhost",
    port : 5432,
    user : "postgres",
    password : "12345",
    database : "Emeployer Space"
})

module.exports = db
