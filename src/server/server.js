const mysql = require('mysql');
const express = require('express');

const connection = mysql.createPool({
  host: 'sql8.freemysqlhosting.net', // Your connection adress (localhost).
  user: 'sql8596986', // Your database's username.
  password: 'zzRR3mNM8j', // Your database's password.
  database: 'sql8596986', // Your database's name.
});

// Starting our app.
const app = express();

// Creating a GET route that returns data from the 'users' table.
app.get('/users', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received');
  // Connecting to the database.
  connection.getConnection((err, conn) => {
    // Executing the MySQL query (select all data from the 'users' table).
    conn.query('SELECT * FROM user', (error, results) => {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
  });
});

// Starting our server.
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/users so you can see the data.');
});
