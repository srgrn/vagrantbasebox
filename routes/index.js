
/*
 * GET home page.
 */

module.exports = exports = function(app,db){
  	boxes = db.collection('boxes');
	app.get('/',function(req,res){
		return res.render('index');
		});
	app.get('/api/boxes_verified', function(req, res){ 
		boxes.find({"tested": true }).toArray(function(err,items){
			return res.json(items);
		});	
  	});
	app.get('/api/boxes', function(req, res){ 
		boxes.find({}).toArray(function(err,items){
			return res.json(items);
		});	
  	});

	app.get('/api/box/:name',function(req,res){
		var name = req.params.name;
		boxes.find({"name" : name }).toArray(function(err,items){
			return res.json(items);
		});	

	});
};
