
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
	app.post('/api/newbox',function(req,res){
		var params = ['name','provider','url','size'];
		var newbox = {};
		for(key in req.body) {
			if(params.indexOf(key) != -1) {
				newbox[key] = req.body[key];
			}
		}
		if(Object.keys(newbox).length != params.length) {
			return res.json({ "error" : "missing values"});
		}
		boxes.find({ 'name' : newbox['name']}).each(function(err,doc){
			if(err) return err;
			if(doc != null) {
				return res.json({ "error" : "Already exists"});
			} else {
				boxes.insert(newbox,{ safe : true },function(err,doc){
					console.log("inserted new box ",doc);
					return res.json(doc);
				});
			}
		});		
	});
	app.post('/api/voteup',function(req,res){
		var name = req.body.name;
		boxes.update({ 'name':name},{ $inc: { score: 1 } },function(err,result){
				return res.json(result);
		});
	});
	app.post('/api/votedown',function(req,res){
		var name = req.body.name;
		boxes.update({ 'name':name},{ $inc: { score: -1 } },function(err,result){
				return res.json(result);
		});
	});

};
