var express    = require("express");
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "lidar"
});
var app = express();
/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
  */

 app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.get("/event_tracks",function(req,res){
    connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ...");    
    } else {
        console.log("Error connecting database ...");    
    }
    });
    connection.query('SELECT * FROM track_event', function(err, rows) {
        connection.end();
        if (!err){
            const headers = {
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
                "Access-Control-Allow-Credentials": true
            };
            res.writeHead(200, headers);
            res.send(rows);
            res.end();
            console.log('The solution is: ', rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
});

app.get("/",function(req,res){
    console.log('Welcome to mysql server');
});

app.listen(8082, function(req, res){
    console.log('Running on mysql server: http://localhost:8082');
});