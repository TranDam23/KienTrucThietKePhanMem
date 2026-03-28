// db.js
const sql = require('mssql');

const config = {
    user: 'sa',
    password: 'sapassword',
    server: 'localhost',
    database: 'EcommerceDB',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = { sql, pool, poolConnect };