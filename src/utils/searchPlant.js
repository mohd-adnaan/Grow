var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'mysqlmydatabase',
  database: 'dataGrow',
});

// Check if the MySQL connection is still active
function handleDisconnect() {
  connection.connect(function (err) {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(handleDisconnect, 2000);
    } else {
      console.log('Connected to MySQL database');
    }
  });

  connection.on('error', function (err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

function levenshtein(s1, s2) {
  const s1_len = s1.length;
  const s2_len = s2.length;
  let cv0 = new Array(s2_len + 1);
  let cv1 = new Array(s2_len + 1);

  for (let i = 0; i <= s2_len; i++) {
    cv0[i] = i;
  }

  for (let i = 0; i < s1_len; i++) {
    cv1[0] = i + 1;

    for (let j = 0; j < s2_len; j++) {
      const cost = s1[i] === s2[j] ? 0 : 1;
      cv1[j + 1] = Math.min(cv1[j] + 1, cv0[j + 1] + 1, cv0[j] + cost);
    }

    for (let j = 0; j <= s2_len; j++) {
      cv0[j] = cv1[j];
    }
  }

  return cv1[s2_len];
}

app.listen(3001, function () {
  console.log('Server is running on http://localhost:3001');
});

app.get('/plant_data_detailed', function (req, res) {
  try {
    const plantName = req.query.plantName;
    if (plantName) {
      const sql = `
        SELECT *
        FROM plant_data_detailed
        WHERE (LEVENSHTEIN(scientific_name, ?) <= 4 
        OR scientific_name LIKE ?
        OR comm_names LIKE ?)`;
      connection.query(sql, [plantName, `%${plantName}%`, `%${plantName}%`], (error, results) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('Query results:', results);
          res.json(results);
        }
      });
    } else {
      console.error("Invalid 'plantName' parameter");
      res.status(400).send('Bad Request');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});
