const mysql = require('mysql2'); // to import mysql

  // Connect to database
function connectDB() {
 return mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'CsCb$1se',
      database: 'employee_tracker'
    },    
  );
}

const db = connectDB();

module.exports = db;
 

