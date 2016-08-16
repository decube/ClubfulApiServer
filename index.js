var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
    res.json({ code : true ,message: 'Added' });
});

app.post('hi', function(req, res){
  var title = req.body.title;
  res.send(title);
});

app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

var versionCheck = require('./src/router/versionCheck.js');
app.use('/versionCheck', versionCheck);

app.listen(3000, function(){
    console.log('Connection 3000 port!');
});
