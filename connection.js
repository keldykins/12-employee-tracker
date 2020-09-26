const mysql = require("mysql");

//listens for queries

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker",
});

connection.connect();

module.exports = connection;
