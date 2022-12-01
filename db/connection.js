const mysql = require('mysql2'); // to import mysql
require('dotenv').config();


  const db =  mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: process.env.DB_NAME,
  password: process.env.DB_PW 
})




module.exports = db;


