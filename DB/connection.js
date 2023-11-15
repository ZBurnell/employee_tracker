const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'FuzzlightYear0318',
    database: 'realcompany_db',
});

module.exports = db;