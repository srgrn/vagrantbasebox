var MongoClient = require('mongodb').MongoClient,
 request = require('request'),
 cheerio = require('cheerio');
var username = process.env.MONGOUSER;
var password = process.env.MONGOPASS;

var connection_string = process.env.DB ||'mongodb://'+ username + ':' + password +'@oceanic.mongohq.com:10031/vagrantBaseBox'; 
MongoClient.connect(connection_string,function(err, db) {
	if (err) { console.log(err);}
	console.log("Connectd to db");					
	var boxes = db.collection("boxes");
	boxes.drop();
	var url = "http://www.vagrantbox.es/";
		request(url, function(err, resp, body) {
			if (err) throw err;
			$ = cheerio.load(body);
			var count = $('tr').length-1;
			console.log(count);
		 	$('tr').each(function(curr) {
				var cells = $(this).find('td');
				var record = {};
				record.name = $(this).find('th').text().replace(/[\n\t]/,"");
				if(record.name.indexOf("NameProvider") != -1) return;
				record.provider = $(cells[0]).text();
				record.url = $(cells[1]).text();
				record.size = parseInt($(cells[2]).text().replace(/\s?MB/,""));
				record.score = 0;
				record.tested = false;
				boxes.update({ name: record.name}, record, {upsert:true,safe:false} , function (err, result) {
		            "use strict";
		            if (err) throw err;
		            console.log("Inserted new record, ",count);
					count--;
					if (count === 0) {
						return db.close();
					}	
				});
			});
		});


	});

	


