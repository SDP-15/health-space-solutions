const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const moment = require('moment');

// create application/json parser
const jsonParser = bodyParser.json();

const connection = mysql.createPool({
  host: 'sdp-15.cdi3alkln8jp.eu-west-2.rds.amazonaws.com', // Your connection adress (localhost).
  user: 'admin', // Your database's username.
  password: 'jiphEx-woffez-8qaqto', // Your database's password.
  database: 'sdp-15', // Your database's name.
});

// Starting our app.
const app = express();
app.use(cors());

// Eye assist
app.get('/eye/bars', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /eye/bars');
  const query = `SELECT * FROM eyetracker WHERE \`timestamp\` > '${moment().format(
    'YYYY-MM-DD'
  )}' ORDER BY timestamp DESC;`;
  const lookAwaySeconds = 20;
  console.log(query);

  connection.getConnection((err, conn) => {
    conn.query(query, (error, results) => {
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      const dataTuples = results.reverse();
      const bars = [];
      let looking = true;
      let lookingStart = '';
      let notLookingStart = '';
      let previousTime = dataTuples[0].timestamp || '';
      for (let i = 0; i < dataTuples.length; i += 1) {
        // If there is a gap between the data, end previous timeframe and start new one.
        const prev = new Date(previousTime);
        const now = new Date(dataTuples[i].timestamp);
        const diffData = (now - prev) / 1000;
        if (diffData > 30) {
          if (looking) {
            // Calculate how long we were looking for
            const from = new Date(lookingStart);
            const to = new Date(dataTuples[i - 1].timestamp);
            const diff = (to - from) / 1000 / 60; // in mins

            // Only restart if it has been at least 5 minutes?
            if (diff > 1) {
              bars.push({ duration: diff });
            }
          }

          lookingStart = '';
        }

        previousTime = dataTuples[i].timestamp;
        if (dataTuples[i].score === 0) {
          if (lookingStart === '') {
            lookingStart = dataTuples[i].timestamp;
          }
          if (!looking) {
            looking = true;
            // Calculate how long we were looking for
            const fromNot = new Date(notLookingStart);
            const toNot = new Date(dataTuples[i - 1].timestamp);
            const diffNot = (toNot - fromNot) / 1000;
            if (diffNot >= lookAwaySeconds) {
              // Calculate how long we were looking for
              const from = new Date(lookingStart);
              const to = new Date(notLookingStart);
              const diff = (to - from) / 1000 / 60; // in mins

              // Only restart if it has been at least 5 minutes?
              if (diff > 1) {
                bars.push({ duration: diff });
                // console.log(lookingStart);
                lookingStart = dataTuples[i].timestamp;
                // console.log(lookingStart);
              }
            }
          }
        } else if (looking) {
          looking = false;
          notLookingStart = dataTuples[i].timestamp;
        }
      }
      res.send(bars);
    });
    conn.release();
  });
});

// Get the moving average of the day
app.get('/score/moving_average', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /score/moving_average');
  const { timeframe } = req.query;
  let query = 'SELECT * FROM score';
  let window = 30;
  if (timeframe === 'today') {
    query += ` WHERE \`timestamp\` > '${moment().format(
      'YYYY-MM-DD'
    )}' ORDER BY timestamp DESC;`;
    window = 120;
  } else if (timeframe.endsWith('min')) {
    const minutes = parseInt(timeframe.split('min')[0], 10);
    query += ` WHERE \`timestamp\` > '${moment()
      .subtract(minutes, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss')}' ORDER BY timestamp DESC;`;
  } else {
    throw Error('Invalid Timeframe');
  }
  console.log(query);

  connection.getConnection((err, conn) => {
    conn.query(query, (error, results) => {
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      const dataTuples = results.reverse();
      const movingAverage = [];
      for (let i = 0; i < dataTuples.length - window + 1; i += 1) {
        const data = dataTuples
          .slice(i, i + window)
          .map((entry) => entry.score);
        const sum = data.reduce((a, b) => a + b, 0);
        const avg = sum / data.length || 0;
        movingAverage.push({
          score: avg * 100,
          timestamp: Math.floor(
            new Date(dataTuples[i + window - 1].timestamp).getTime() / 1000
          ),
        }); // In percent
      }
      res.send(movingAverage);
    });
    conn.release();
  });
});

// Get the good/bad percentage
app.get('/score/percentage', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /score/percentage');
  const { timeframe } = req.query;
  let query = 'SELECT * FROM score';
  if (timeframe === 'today') {
    query += ` WHERE \`timestamp\` > '${moment().format(
      'YYYY-MM-DD'
    )}' ORDER BY timestamp DESC;`;
  } else if (timeframe.endsWith('min')) {
    const minutes = parseInt(timeframe.split('min')[0], 10);
    query += ` WHERE \`timestamp\` > '${moment()
      .subtract(minutes, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss')}' ORDER BY timestamp DESC;`;
  } else {
    throw Error('Invalid Timeframe');
  }
  console.log(query);

  connection.getConnection((err, conn) => {
    conn.query(query, (error, results) => {
      if (error) throw error;
      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      const scores = results.map((entry) => entry.score);
      const sum = scores.reduce((a, b) => a + b, 0);
      const percentageGood = sum / scores.length || 1;
      res.send({ good: percentageGood, bad: 1 - percentageGood });
    });
    conn.release();
  });
});

// Get the moving average of the day
app.get('/score/split', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('Request received on GET /score/split');
  const { timeframe } = req.query;
  let query = 'SELECT * FROM score';
  if (timeframe === 'today') {
    query += ` WHERE \`timestamp\` > '${moment().format(
      'YYYY-MM-DD'
    )}' ORDER BY timestamp DESC;`;
  } else if (timeframe.endsWith('min')) {
    const minutes = parseInt(timeframe.split('min')[0], 10);
    query += ` WHERE \`timestamp\` > '${moment()
      .subtract(minutes, 'minutes')
      .format('YYYY-MM-DD HH:mm:ss')}' ORDER BY timestamp DESC;`;
  } else {
    throw Error('Invalid Timeframe');
  }
  console.log(query);

  connection.getConnection((err, conn) => {
    conn.query(query, (error, results) => {
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      const reasons = results.map((entry) => entry.reason);
      const counts = [0, 0, 0, 0];
      for (let i = 0; i < reasons.length; i += 1) {
        const reason = reasons[i];
        if (reason < 1) {
          counts[0] += 1; // Good posture
        } else if (reason === 1 || reason === 2) {
          counts[1] += 1; // Crossing legs
        } else if (reason === 3) {
          counts[2] += 1; // Slouching
        } else if (reason === 4) {
          counts[3] += 1; // Hunching
        }
      }
      const sum = counts.reduce((a, b) => a + b, 0);
      const percentages = counts.map((value) => value / sum);
      const dict = {
        good: percentages[0],
        crossing_legs: percentages[1],
        slouching: percentages[2],
        hunching: percentages[3],
      };
      res.send(dict);
    });
    conn.release();
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
    conn.release();
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
    conn.release();
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
    conn.release();
  });
});

// Starting our server.
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/users so you can see some data.');
});
