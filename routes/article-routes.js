module.exports = function(app){
    // Importing the Article from article.js:
    var article = require('./../controllers/article-controllers');
    
    //Not needed because of database
    // var article = [];   

    app.get('/new-article', article.new);
    
    app.post('/article/create', article.create);
    
    
    
    app.get('/article/list', article.list);
    
    // Fetching for EJS files
    // articleID is a variable
    // use index of array for articleID
    // article.push({title: "Test article 1", content: "Content 1"});
    // article.push({title: "Test article 2", content: "Content 2"});
    
    app.get('/article/:articleID', article.single);
}