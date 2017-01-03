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
              console.log('여기오나');
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
  var categorySeq = req.body.categorySeq;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var flag = req.body.flag;

  // var token = req.query.token;
  // var page = req.query.page;
  // var size = req.query.size;
  // var categorySeq = req.query.categorySeq;

  var rtCode=1;
  var rtMsg = '';

  if(categorySeq == null || categorySeq == '' ){
    categorySeq = 1;
  }
  if(page == null || page == '' ){
    page = 1;
  }
  if(size == null || size == '' ){
    size = 3;
  }
  //t:시간순, i: 좋아요순, d: 거리순
  var tempQuery = _Query.getMainCourtTList;
  var tempParameter = [categorySeq, (page - 1) * size, Number(size)];
  var tempCntQuery = _Query.getMainCourtTCCount;
  var tempCntParameter = [categorySeq];
  if(flag =='t' && categorySeq == -1){
    tempQuery = _Query.getMainCourtTCList;
    tempParameter = [(page - 1) * size, Number(size)];
    tempCntQuery = _Query.getMainCourtTCCount;
    tempCntParameter = [];
  }else if(flag =='t'){
    tempQuery = _Query.getMainCourtTList;
    tempCntQuery = _Query.getMainCourtTCCount;
  }else if(flag == 'i'){
    tempQuery = _Query.getMainCourtIList;
  }else if(flag == 'd'){
    tempQuery = _Query.getMainCourtDList;
  }

  _DBPool.acquire(function(err, db) {
      if (err) return res.end("CONNECTION error: " + err);
      db.query(tempCntQuery, tempCntParameter, function(err, rowCourtCnt, columns) {
        console.log("err1:"+err);
        if (err) {
          res.json({ code : 1,msg : "다시 시도해 주세요.",isMsgView : false});
        }else{
          console.log(rowCourtCnt);
          console.log(rowCourtCnt[0]);
          var totalCnt = rowCourtCnt[0]["cnt"];
          console.log("totalCnt:"+totalCnt);
          db.query(tempQuery,tempParameter,function(err, rowCourtList, columns) {
            console.log("err2:"+err);
            if (err) {
              res.json({ code : 1,msg : "다시 시도해 주세요.",isMsgView : false});
            }else{
              rtCode = 0;
              rtMsg = "";
              res.json({ code : rtCode,msg : rtMsg,isMsgView : false,totalCnt : totalCnt,list : rowCourtList});
            }
          });
        }
      });
      _DBPool.release(db);
  });
});

module.exports = router;
