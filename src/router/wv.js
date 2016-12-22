var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

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

router.get('/guide', function(req, res) {
  fs.readFile('/client/guide.html', function(error, data){
    if(error){
      console.log(error);
    }else{
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }
  });
});


module.exports = router;
