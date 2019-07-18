var express = require('express');
var app = express();
var cors = require('cors')
var mysql      = require('mysql');

app.use(cors())
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

var connection = mysql.createConnection({
    host: "164.132.110.43",
    //host: "https://mysql.engie.the-machine.xyz",
    port: 3306,
    user: "lidar",
    password: "IiGdt4sEPZS6609y",
    database: "lidar"
});

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ...");    
    } else {
        console.log("Error connecting database ...");    
    }
});

app.get("/event_tracks",function(req,res){    
    connection.query('SELECT * FROM track_event', function(err, rows) {
        if (!err){
            res.send(rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
});

app.get('/', function(req, res){
    res.render("index");
});

app.listen(process.env.PORT || 3000, function(req, res){
    console.log('Running on server: http://localhost:3000');
});