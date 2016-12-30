var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/category')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/insert', function(req, res) {

  var token = req.body.token;
  var userId = req.body.userId;
  var categoryName = req.body.categoryName;

  // var token = req.query.token;
  // var userId = req.query.userId;
  // var categoryName = req.query.categoryName;

  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query(_Query.insertCategory,[categoryName],function(err, rowDevice, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            var rtCode=0;
            var rtMsg = '정보가 수정 되었습니다.';
            res.json({ code : rtCode
                      ,msg : rtMsg
                      ,isMsgView : true
                     });

          }
      });
      _DBPool.release(db);

  });

});



module.exports = router;
