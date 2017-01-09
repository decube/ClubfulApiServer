var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/reply')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route


router.post('/insert', function(req, res) {

  var token = req.body.token;
  var seq = req.body.seq;
  var context = req.body.context;
  var userId = req.body.userId;
  var replySeq = req.body.replySeq;

  if(replySeq == null || replySeq ==''){
    replySeq = 0;
  }
  console.log(' 1111??');
  var rtCode=1;
  var checkInsert = false;
  var rtMsg = '';
  console.log(' 2222??'+_Query.insertReply);
  _DBPool.acquire(function(err, db) {
      if (err) {
        rtMsg = '커낵션 에러';
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.insertReply,[context, userId, seq],function(err, rowInsertReply, columns) {
          if (err) {
            console.log(err);
            rtMsg = '디비 에러';
          }else{
            checkInsert=true;
            _DBPool.release(db);
            if(checkInsert){
              _DBPool.acquire(function(err, db) {
                if (err) {
                  rtMsg = '커낵션 에러';
                  return res.end("CONNECTION error: " + err);
                }
                db.query(_Query.selectReply,[seq, replySeq],function(err, rowReply, columns) {
                    if (err) {
                      console.log(err);
                      rtMsg = '디비 에러';
                    }else{
                      rtCode = 0;
                      rtMsg = '성공';
                      res.json({ code : rtCode
                              ,msg : rtMsg
                              ,isMsgView : false
                              ,list : rowReply
                             });
                    }
                });
                _DBPool.release(db); 
              });
            }
          }
          
      });


      
  });
  console.log(checkInsert);
  
  
  
  
});

router.post('/select', function(req, res) {

  var token = req.body.token;
  var page = req.body.page;
  var size = req.body.size;
  var seq = req.body.seq;
  
  var start = 0;
  var rtCode=1;
  var rtMsg = '';

  if(size == null || size == '' ){
    size = 5;
  }
  if(page == null || page == '' ){
    page = 1;
  }
  start = (page - 1) * size;
  
 _DBPool.acquire(function(err, db) {
    if (err) {
      rtMsg = '커낵션 에러';
      return res.end("CONNECTION error: " + err);
    }
    db.query(_Query.selectPagingReply,[seq, page, size, size],function(err, rowReply, columns) {
        if (err) {
          console.log(err);
          rtMsg = '디비 에러';
          res.json({ code : rtCode
                  ,msg : rtMsg
                  ,isMsgView : false
                 });
        }else{
          rtCode = 0;
          rtMsg = '성공';
          res.json({ code : rtCode
                  ,msg : rtMsg
                  ,isMsgView : false
                  ,list : rowReply
                 });
        }
    });
    _DBPool.release(db); 
  });
});

module.exports = router;
