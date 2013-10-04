
/**
 * Module dependencies.
 */

var express = require('express');
var index = require('./routes/index');
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
	app.use(function(req, res, next){
		var	_	= require('underscore'),
			file = require('file')
		
		var ret = [];
		var start = "public/js";
		file.walkSync(start,function(start,dirs,names){
			var rel = _.rest(start.split(path.sep)).join(path.sep);	
			_.each(names,function(elem){
				if(path.extname(elem) === ".js"){
					ret.push(path.join(rel,elem));
				}
			});
		});
		res.locals.list=ret;
		next();
	});
   	// all environments
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
	
	index(app,passport,db);
	api(app, passport, db);
		// development only
	if ('development' == app.get('env')) {
	  app.use(express.errorHandler());
	}

	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
});


