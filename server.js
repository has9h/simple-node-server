var http = require('http');
// Using express to start the server and add routes
var express = require("express");
var app = express();            // The express app
var server = http.Server(app);  // Adding the server
var bodyParser = require('body-parser');
// Required for static files
// var path = require('path');
// app.use(express.static(path.resolve('views')));

// Import MongoDB:
// Not required if mongoose is installed and running; does this for you
// var mongo = require('mongodb');
// Specifying port for C9
var db;                                                   // Database client if connection is successfull
var db_url = "mongodb://" + process.env.IP + ":27017";    //process.env specifies the port of the workspace(?)
// For local instance:
// var db_url = "mongodb://localhost:27017";

// Working with Mongoose:
var mongoose = require("mongoose");
mongoose.connect(db_url + "/node-cw9");
mongoose.connection.on('error', function(err){
  console.log(err);
  console.log('Could not connect to MongoDB');
});


// mongo.MongoClient.connect(db_url, {useNewUrlParser: true}, function(err, client){
//   if(err){
//     console.log('Could not connect to MongoDB');
//   }else{
//     db = client.db('node-cw9');
//   }
// });
// Remember find() returns an ARRAY; findOne returns an object(?)

// Saving user data
// var save = function(form_data){
//   db.createCollection('articles', function(err, collection){
//     console.log("Collection Created");
//   });
//   var collection = db.collection('articles');
//   collection.save(form_data);
// }

// Configuring app for body-parser
app.use(bodyParser.json());
// Ensuring it uses encoded URLs
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){                 // '/' is the root URL
  response.render('index.ejs');
});

app.get('/about-page', function(request, response){       // '/' is the root URL
  response.render('about.ejs');
});

require('./routes/article-routes.js')(app);
server.listen(process.env.PORT, process.env.IP, function(){
  console.log('Server running');
});

// Remove the file serving code and add the express.js code
// var fs = require('fs');
//   var server = http.createServer(function(req, res){
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     fs.readFile('index.html', function(err, data){
//         if(err){
//             return console.log("File system read error");
//         }
//         res.end(data);
//     });
//     // res.end("Hello World\n");
//   });
//   server.listen(process.env.PORT, process.env.IP, function(){
//     console.log('Server running');
//   });