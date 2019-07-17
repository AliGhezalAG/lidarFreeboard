var mysql = require('mysql'); 

var con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
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