var express	= require('express');
var app		= express();
var mongojs	= require('mongojs');
var bpars	= require('body-parser');

var db		= mongojs('contacts',['contacts']);

app.use(express.static(__dirname + "/public"));
app.use(bpars.json());

app.get('/contacts', function(req, res){
	console.log('Req 	: contacts');
	db.contacts.find(function(err, docs){
		res.json(docs);
	});
});

app.post('/contacts', function(req, res){
	console.log('Menambah ===>');
	console.log(req.body);
	db.contacts.insert(req.body, function(err, docs){
		res.json(docs);
	});
});

app.delete('/contacts/:id', function(req, res){
	var id	= req.params.id;
	console.log('Menghapus ===>');
	console.log(id);
	db.contacts.remove({_id:  mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.get('/contacts/:id', function(req, res){
	var id	= req.params.id;
	console.log('Mengubah ===>');
	console.log(id);
	db.contacts.findOne({_id:  mongojs.ObjectId(id)}, function(err, docs){
		res.json(docs);
	});
});

app.put('/contacts/:id', function(req, res){
	var id	= req.params.id;
	console.log('Menyimpan ===>');
	console.log(id);
	db.contacts.findAndModify({query:{_id: mongojs.ObjectId(id)},
			update: {$set: {nama: req.body.nama, email: req.body.email, nohp: req.body.nohp}},
			new: true}, function(err, docs){
				res.json(docs);
			});
});

app.listen(3000, function(){
	console.log('Berjalan pada port 3000.');
});