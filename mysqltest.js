var mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "mysql.engie.the-machine.xyz",
    port: 3306,
    user: "lidar",
    password: "IiGdt4sEPZS6609y",
    database: "lidar"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query('SELECT * FROM track_event', function (err, result) {
        if (err) throw err;
        console.log("Result: " + result[0]);
      });
  });