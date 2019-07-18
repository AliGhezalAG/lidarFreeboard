var express = require('express');
var app = express();
var cors = require('cors')
var connectionHandler = require('./connection.js');

app.use(cors())
app.use(express.static(__dirname + '/'));
app.use(express.urlencoded({extended: true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname);

var connection = connectionHandler.initConnection();

function processTrackEvents(result){
    var trackEvents = [...new Set(result.map(x => x.track))];
    var count = {};
    count.inZone = 0;
    count.outZone = 0;
    count.bugged = 0;
    for (var i = 0; i < trackEvents.length; i++){
        var newTrackEvents = result.filter(event => event.track == trackEvents[i]);
        var zonesArray = newTrackEvents.map(function (el) { return el.zone; });
        var inZonesArray = zonesArray.filter(zone => zone == "meeting_in");
        var outZonesArray = zonesArray.filter(zone => zone == "meeting_out");

        if(inZonesArray.length > outZonesArray.length){
            count.inZone++;
        } else if(inZonesArray.length == outZonesArray.length){
            count.outZone++;
        } else {
            count.bugged++;
        }
    }
    count.inZone = count.inZone.toString();
    count.outZone = count.outZone.toString();
    count.bugged = count.bugged.toString();
    return count;
}

app.get("/event_tracks",function(req,res){    
    connection.query('SELECT * FROM track_event', function(err, result) {
        if (!err){
            res.send(processTrackEvents(result));
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