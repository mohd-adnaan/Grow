var express = require('express');
var app = express();

var mysql = require('mysql2')
var bodyParser = require('body-parser');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

var connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'mysqlmydatabase',
  database: 'dataGrow',
});

app.listen(3000, function () {
  console.log('Server is running on http://localhost:3000');
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

function test_input(data) {
  data = data.trim();
  data = data.replace(/\\/g, '\\\\');
  data = data.replace(/'/g, "''");
  data = data.replace(/"/g, '\\"');
  return data;
}

app.get('/plant_data_detailed', function (req, res) {
  try {
    const placeName = 'Balrampur, Chattisgarh';// req.query.district;
    if (1) { // put placename condition here
      // const sanitizedDistrict = test_input(placeName);

      const sql = 'SELECT pd.* FROM plant_data_detailed pd';
      //const sql = 'SELECT pd.*'
      //console.log(sql);
      connection.query(sql, (error, results) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('Query results:', results);
          res.json(results);
          console.log(results);
        }
      });
    } else {
      console.error("Invalid 'district' parameter");
      res.status(400).send('Bad Request');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send('Internal Server Error');
  }
});
