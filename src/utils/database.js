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

var cors = require('cors');
    app.use(cors());

app.get('/plant_data_detailed', function (req, res) {
      try {
        const district = req.query.district;
        const state = req.query.state;
        const name = req.query.name;
    
        console.log('Received district:', district);
        console.log('Received state:', state);
        console.log('Received name:', name);
    
        if (district && state && name) {
          const sql = `
            SELECT pd.*
            FROM plant_data_detailed pd
            JOIN species_zone_association sza ON pd.scientific_name IN (
              SELECT JSON_UNQUOTE(JSON_EXTRACT(sza.scientificName, CONCAT('$[', numbers.n, ']')))
              FROM (
                SELECT 0 AS n UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9
              ) numbers
            )
            JOIN district_zone_association dza ON sza.zoneIndex = dza.zone_index
            WHERE dza.district = ? AND sza.name = ?`;
    
          connection.query(sql, [district, name], (error, results) => {
            if (error) {
              console.error(`Error: ${error.message}`);
              res.status(500).send('Internal Server Error');
            } else {
              console.log('Query results:', results);
              res.json(results);
            }
          });
        } else {
          console.error("Invalid 'district', 'state', or 'name' parameter");
          res.status(400).send('Bad Request');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).send('Internal Server Error');
      }
    });
    