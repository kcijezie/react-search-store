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

function sortAscending(a,b) {
  if (a.titleText.toLowerCase() < b.titleText.toLowerCase())
    return -1;
  if (a.titleText.toLowerCase() > b.titleText.toLowerCase())
    return 1;
  return 0;
};

function sortDescending(a,b) {
  if (a.titleText.toLowerCase() > b.titleText.toLowerCase())
    return -1;
  if (a.titleText.toLowerCase() < b.titleText.toLowerCase())
    return 1;
  return 0;
};


function getPaginatedItems(items, pageNo, perPage, sort) {
	var page = pageNo || 1,
	    per_page = perPage || 5,
	    title_sort = sort,
	    offset = (page - 1) * per_page,
	    paginatedItems = items.slice(offset, offset + per_page);
	return {
		page: page,
		per_page: per_page,
		total: items.length,
		total_pages: Math.ceil(items.length / per_page),
		titles: paginatedItems,
        sort: sort
	};
};

if (typeof _ipaddress === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
    _ipaddress = "127.0.0.1";
};

app.get('/api/titles', function(req, res) {
    var perPage= req.param('perPage');  
    var pageNo = req.param('pageNo');
    var sort = req.param('sort') || 'asc';
    var fs = require("fs");
    var content = fs.readFileSync('data/ELSIO-Graph-Example.txt', 'utf8');
    var obj = JSON.parse(content);
    var objArr = [];
    for(var key in obj.worksById) {
        objArr.push({id: key, titleType: obj.worksById[key].Title.TitleType, titleText: obj.worksById[key].Title.TitleText})
    }
    res.json(getPaginatedItems(sort === 'asc' ? objArr.sort(sortAscending) : objArr.sort(sortDescending), parseInt(pageNo), parseInt(perPage), sort));    
    
});

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

