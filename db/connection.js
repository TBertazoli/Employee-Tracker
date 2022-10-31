const mysql = require('mysql2'); // to import mysql

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'CsCb$1se',
    database: 'election'
  },
  console.log('Connected to the election database.')
);

module.exports = db;