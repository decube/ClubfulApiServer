var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  console.log('Time: ', Date.now());
  next();
});

function resultRes(name, res){
  fs.readFile(__dirname+'/../../client/'+name+'.html', function(error, data){
    if(error){
      console.log(error);
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
}

router.get('/guide', function(req, res) {
  resultRes('guide', res)
});
router.get('/info', function(req, res) {
  resultRes('info', res)
});
router.get('/inquiry', function(req, res) {
  resultRes('inquiry', res)
});
router.get('/notice', function(req, res) {
  resultRes('notice', res)
});

module.exports = router;
