
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./routes/user');
var api = require('./routes/api');
var http = require('http');
var path = require('path');
var passport = require('passport');
var MongoClient = require('mongodb').MongoClient;


var password = process.env.MONGOPASS;
var username = process.env.MONGOUSER;
var connection_string = process.env.DB ||'mongodb://'+ username + ':' + password +'@paulo.mongohq.com:10035/vagrantBaseBox'; 
MongoClient.connect(connection_string,function(err, db) {

	"use strict";
    if(err) throw err;

	require('./config/passport')(passport, db);
	var app = express();

   	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	
	api(app, passport, db);
	app.get('/partials/:name',function (req, res){
		var name = req.params.name;
		res.render('partials/' + name);
	});
	// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});
