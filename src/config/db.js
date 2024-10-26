const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass',
    port: 3306,
    database: 'sportsEvents'
});

module.exports = pool.promise();