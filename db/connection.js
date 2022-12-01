const mysql = require('mysql2'); // to import mysql
require('dotenv').config();

  // Connect to database
// function connectDB() {
//  return mysql.createConnection(
//     {
//       host: 'localhost',
//       // Your MySQL username,
//       user: 'root',
//       // Your MySQL password
//       password: 'CsCb$1se',
//       database: 'employee_tracker'
//     },    
//   );
// }



// module.exports = db;
 
  const db =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: process.env.DB_NAME,
  password: process.env.DB_PW 
})




module.exports = db;


