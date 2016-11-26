var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/main')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.post('/list', function(req, res) {

  var token = req.body.token;
  var page = req.body.page;
  var count = req.body.count;
  var categorySeq = req.body.categorySeq;

  // var token = req.query.token;
  // var page = req.query.page;
  // var count = req.query.count;
  // var categorySeq = req.query.categorySeq;

  var rtCode=1;
  var rtMsg = '';

  if(categorySeq == null || categorySeq == '' ){
    categorySeq = 1;
  }
  if(page == null || page == '' ){
    page = 1;
  }
  if(count == null || count == '' ){
    count = 3;
  }

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.getCourtList,[categorySeq, page, count],function(err, rowCourtList, columns) {
          if (err) {
            res.json({ code : 1
                      ,msg : "다시 시도해 주세요."
                      ,isMsgView : false
                     });
          }else{
            rtCode = 0;
            rtMsg = "";
            var tPage = 0;
            if(rowCourtList.length%count == 0){
              tPage = rowCourtList.length/count
            }else{
              tPage = (rowCourtList.length/count)+1;
            }
            res.json({ code : rtCode
                      ,msg : rtMsg
                      ,isMsgView : false
                      ,totalCnt : rowCourtList.length
                      ,totalPage : tPage
                      ,list : rowCourtList
                     });
          }
      });

      _DBPool.release(db);

  });

});




module.exports = router;
