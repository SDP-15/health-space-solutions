const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// create application/json parser
const jsonParser = bodyParser.json();

const connection = mysql.createPool({
  host: 'sql8.freemysqlhosting.net', // Your connection adress (localhost).
  user: 'sql8596986', // Your database's username.
  password: 'zzRR3mNM8j', // Your database's password.
  database: 'sql8596986', // Your database's name.
});

// Starting our app.
const app = express();
app.use(cors());

// Creating a GET route that returns data from the 'pressure_sensor_data' table.
app.get('/pressure_sensor_data', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /pressure_sensor_data');
  // Connecting to the database.
  connection.getConnection((err, conn) => {
    // Executing the MySQL query (select all data from the 'pressure_sensor_data' table).
    conn.query('SELECT * FROM sensor_data', (error, results) => {
      // If some error occurs, we throw an error.
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
      console.log('results: ', results);
    });
    conn.end();
  });
});

// Creating a GET route that returns data from the 'users' table.
app.get('/users', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /users');
  // Connecting to the database.
  connection.getConnection((err, conn) => {
    // Executing the MySQL query (select all data from the 'users' table).
    conn.query('SELECT * FROM user', (error, results) => {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results);
    });
    conn.end();
  });
});

app.post('/login', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on POST /login with payload: ');
  console.log(req.body);

  connection.getConnection((err, conn) => {
    let success = false;
    conn.query(
      `SELECT * FROM \`user\` WHERE eMail = ? AND password = ?`,
      [req.body.email, req.body.password],
      (error, results) => {
        if (error) throw error;
        success = results.length > 0;
        res.send(success);
      }
    );
    conn.end();
  });
});

app.post('/register', jsonParser, (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on POST /register with payload: ');
  console.log(req.body);

  // extract data
  const { email, firstName, lastName, password } = req.body;

  // Connecting to the database.
  connection.getConnection((err, conn) => {
    // Check if user with that email already exists
    let success = false;
    conn.query(
      `SELECT * FROM \`user\` WHERE eMail = "${req.body.email}"`,
      (error, results) => {
        // If some error occurs, we throw an error.
        if (error) throw error;

        // If no user with the e-mail exists yet, create user
        if (results.length === 0) {
          conn.query(
            `INSERT INTO \`user\`(\`eMail\`, \`firstName\`, \`lastName\`, \`password\`) VALUES ('${email}','${firstName}','${lastName}','${password}')`,
            (error2) => {
              if (error2) throw error2;

              success = true;
              res.send(success);
              console.log('User created');
            }
          );
        } else {
          console.log('User already exists');
          res.send(success);
        }
      }
    );
    conn.end();
  });
});

// Starting our server.
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/users so you can see some data.');
});
