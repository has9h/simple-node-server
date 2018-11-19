var http = require('http');
// Using express to start the server and add routes
var express = require("express");
var app = express();            // The express app
var server = http.Server(app);  // Adding the server
var bodyParser = require('body-parser');

// Import MongoDB:
var mongo = require('mongodb');
// Specifying port for C9
var db;                                                   // Database client if connection is successfull
var db_url = "mongodb://" + process.env.IP + ":27017";    //process.env specifies the port of the workspace(?)
// For local instance:
// var db_url = "mongodb://localhost:27017";

mongo.MongoClient.connect(db_url, {useNewUrlParser: true}, function(err, client){
  if(err){
    console.log('Could not connect to MongoDB');
  }else{
    db = client.db('node-cw9');
  }
});

// Saving user data
var save = function(form_data){
  db.createCollection('articles', function(err, collection){
    console.log("Collection Created");
  });
}

// Configuring app for body-parser
app.use(bodyParser.json());
// Ensuring it uses encoded URLs
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(request, response){                 // '/' is the root URL
  response.sendFile(__dirname+'/index.html');
});

app.get('/about-page', function(request, response){       // '/' is the root URL
  response.sendFile(__dirname+'/about.html');
});

app.get('/new-article', function(request, response){
  response.sendFile(__dirname+'/form.html');
});

var article = [];

app.post('/article/create', function(request, response){
  console.log(request.body);
  // Required field: Title
  if(!request.body.title){
    return response.status(400).json({error:"Please add a title"});
  }
  article.push(request.body);                         //This should be saved to the database
  return response.status(200).json({message: "Article successfully created"});
});


app.get('/article/list', function(request, response){
  return response.status(200).json({articles: article});
});

// Fetching for EJS files
// articleID is a variable
// use index of array for articleID
article.push({title: "Test article 1", content: "Content 1"});
article.push({title: "Test article 2", content: "Content 2"});

app.get('/article/:articleID', function(request, response){
  response.render('../article.ejs', {
    article:article[request.params.articleID]});
});

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