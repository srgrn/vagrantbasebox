
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var password = process.env.MONGOPASS;
var username = process.env.MONGOUSER;
MongoClient.connect('mongodb://'+ username + ':' + password +'@paulo.mongohq.com:10035/vagrantBaseBox', function(err, db) {
    "use strict";
    if(err) throw err;

	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	
	routes(app,db);

	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});
