/**
 * Created by kenei on 08/08/2016.
 */
// Simple Node/Express App to serve up index.html

var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var moment = require('moment');

moment.locale('en-UK');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/dist'));
app.use(morgan('dev'));

// listen (start app with node server.js) ======================================
var _ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var _port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

if (typeof _ipaddress === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    _ipaddress = "127.0.0.1";
};

app.get('/api/titles/', function(req, res) {
    // Read Synchrously
     var fs = require("fs");
     var content = fs.readFileSync('data/ELSIO-Graph-Example.txt', 'utf8');
     var obj = JSON.parse(content);
     var objArr = [];
     for(var key in obj.worksById) {
         objArr.push({id: key, titleType: obj.worksById[key].Title.TitleType, titleText: obj.worksById[key].Title.TitleText})
     }
    res.json(objArr);
});

app.get('*', express.static(__dirname + '/dist/index.html'));
app.listen(_port, _ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
        Date(Date.now() ), _ipaddress, _port);

});

