var Article = require('./../models/article.js');

module.exports.new = function(request, response){
    response.render('form.ejs');
}

module.exports.create = function(request, response){
    // Generating a new article with mongoose, using the schema:
    var new_article = new Article(request.body);
    new_article.save(function(err, data){
    console.log(err);
    if(err)
      return response.status(400).json({error:"Please add a title"});
    console.log(data);
    return response.status(200).json({message: "Article successfully created"});
    });
    
    console.log(request.body);
    // Required field: Title
    // if(!request.body.title){
    //   return response.status(400).json({error:"Please add a title"});
    // }
    // article.push(request.body);     //This should be saved to the database
    // save(request.body);
    // return response.status(200).json({message: "Article successfully created"});
    }
    
// var article =[{title: "Title 1", content: "Content1"}];

module.exports.list = function(request, response){
    Article.find(function(err, data){
    if(err)
        response.status(400).json({
            error:"Database query error"
        });
    response.status(200).json({
        articles: data});
    });
}

module.exports.single = function(request, response){
    Article.findOne({_id: request.params.articleID}),
    function(err, data){
        if(err)
            response.status(400).json({error:"Database query error"});
        response.render('article.js',{
            article:data
        })
    }
}