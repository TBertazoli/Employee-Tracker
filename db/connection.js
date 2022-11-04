const mysql = require('mysql2'); // to import mysql

  // Connect to database
  const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'CsCb$1se',
      database: 'employee_tracker'
    },
    console.log('Connected to the employee tracker database.')
  );


module.exports = db;


