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

var cors = require('cors');
    app.use(cors());

// app.get('/plant_data_detailed', function (req, res) {
//   try {
//     const district = req.query.district;
//     const state = req.query.state;
//     console.log('Received district:', district);
//     console.log('Received state:', state);

//     if (district && state) {
//       const sql = `
//       SELECT pd.*
//       FROM plant_data_detailed pd
//       JOIN species_zone_association sza ON pd.scientific_name IN (
//           SELECT JSON_UNQUOTE(JSON_EXTRACT(sza.scientificName, CONCAT('$[', numbers.n, ']')))
//           FROM (
//               SELECT 0 AS n
//               UNION ALL SELECT 1
//               -- (other UNION ALL SELECTs omitted for brevity)
//               UNION ALL SELECT 60
//           ) numbers
//       )
//       JOIN district_zone_association dza ON sza.zoneIndex = dza.zone_index
//       WHERE dza.district = ? AND sza.name = 'Shrubs with fragrant flowers'`;
      
//       connection.query(sql, [district, state], (error, results) => {
//         if (error) {
//           console.error(`Error: ${error.message}`);
//           res.status(500).send('Internal Server Error');
//         } else {
//           console.log('Query results:', results);
//           res.json(results);
//         }
//       });
//     } else {
//       console.error("Invalid 'district' or 'state' parameter");
//       res.status(400).send('Bad Request');
//     }
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.get('/plant_data_detailed', function (req, res) {
  try {
    const district = req.query.district;
    const state = req.query.state;
    const name = req.query.name; // Add this line to get the 'name' parameter

    console.log('Received district:', district);
    console.log('Received state:', state);
    console.log('Received name:', name); // Log the received name for verification

    if (district && state && name) { // Check if all parameters are provided
      const sql = `
      SELECT pd.*
      FROM plant_data_detailed pd
      JOIN species_zone_association sza ON pd.scientific_name IN (
          SELECT JSON_UNQUOTE(JSON_EXTRACT(sza.scientificName, CONCAT('$[', numbers.n, ']')))
          FROM (
              SELECT 0 AS n
              UNION ALL SELECT 1
              -- (other UNION ALL SELECTs omitted for brevity)
              UNION ALL SELECT 60
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
