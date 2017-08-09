var express = require('express');
var app = express();
var mongojs=require('mongojs');
var db=mongojs('localhost:27017/demo',['contactdetails']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/contactList',function (req,res) {
	db.contactdetails.find(function(err,docs){
       res.json(docs);
       console.log('10');
	});
});
app.delete('/contactList/:id',function(req,res){
       var id = req.params.id;
       db.contactdetails.remove({_id:mongojs.ObjectId(id)},function(err,docs){
          res.json(docs);
       });  
});
app.get('/contactList/:id',function(req,res){
       var id = req.params.id;
       db.contactdetails.find({_id:mongojs.ObjectId(id)},function(err,docs){
          res.json(docs);
       });  
});
app.post('/contactList',function(req,res){
    console.log('inside server.js');
    db.contactdetails.insert(req.body,function(err,docs){
        res.json(docs);
    });
});
app.post('/contactUpdate',function(req,res){
	console.log(req.body);
       var id = req.body[0]._id;
       var x = {
       	name : req.body[0].name,
       	email :req.body[0].email,
       	number : req.body[0].number,
       };
       console.log(req.body[0].name);
       db.contactdetails.update({_id:mongojs.ObjectId(id)},{$set :x
       },function(err,docs){
       	res.json(docs);
       });
       /*db.contactdetails.remove({_id:mongojs.ObjectId(id)},function(err,docs){
          db.contactdetails.insert(docs.body,function(err,docs){
          res.json(docs);
          });
       });*/  
});

app.listen(3000);
console.log("server running on port 3000");


