module.exports = exports = function(app, passport, db){
	app.get('/',function(req,res){
		return res.render('index');
		});
	app.get('/partials/:name',function (req, res){
		var name = req.params.name;
		res.render('partials/' + name);
	});
};
