var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/court')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/insert', function(req, res) {
  // var token = req.body.token;
  // var id = req.body.id;
  // var address = req.body.address;
  // var addressShort = req.body.addressShort;
  // var cname = req.body.cname;
  // var latitude = req.body.latitude;
  // var longitude = req.body.longitude;
  // var description = req.body.description;
  // var picNameArray = req.body.picNameArray;
  // var status = req.body.status;
  // var category_seq = req.body.category_seq;

  var token = req.query.token;
  var id = req.query.id;
  var address = req.query.address;
  var addressShort = req.query.addressShort;
  var cname = req.query.cname;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var description = req.query.description;
  var picNameArray = req.query.picNameArray;
  var status = 'N';
  var category_seq = req.query.category_seq;

  // picNameArray = picNameArray.replace(/'/g, '"');
  // picNameArray = JSON.parse(picNameArray);


  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query(_Query.insertCourt,[address
        , addressShort, cname, latitude
        , longitude, description
        , status, category_seq, token],function(err, rowToken, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            rtCode = 0;
            rtMsg = "코트등록에 성공했습니다.";
            res.json({ code : rtCode
                      ,msg : rtMsg
                      ,isMsgView : true
                     });
          }
      });

      _DBPool.release(db);

  });

});

router.get('/getList', function(req, res) {

  // var token = req.body.token;
  // var address = req.body.address;
  // var category_seq = req.body.category_seq;

  var token = req.query.token;
  var address = req.query.address;
  var category_seq = req.query.category_seq;

  var rtCode=1;
  var rtMsg = '';

  if(category_seq == -1){
    category_seq='';
  }
  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.getCourtList,[address, category_seq],function(err, rowCourtList, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            rtCode = 0;
            rtMsg = "";
            res.json({ code : rtCode
                      ,msg : rtMsg
                      ,isMsgView : false
                      ,list : rowCourtList
                     });
          }
      });

      _DBPool.release(db);

  });

});

router.get('/interest', function(req, res) {

  // var token = req.body.token;
  // var seq = req.body.seq;
  // var type = req.body.type;

  var token = req.query.token;
  var seq = req.query.seq;
  var type = req.query.type;

  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.checkInterest,[seq, token],function(err, rowInterest, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            var tempQuery = '';
            if(rowInterest[0] == null){
              //insert
              tempQuery = _Query.insertInterest;
            }else if(rowInterest[0].interest_yn == 'N'){
              //update
              tempQuery = _Query.updateInterest;
            }else{
            }
            db.query(tempQuery,[seq, token],function(err, rowCourtList, columns) {
                if (err) {
                  rtMsg = "다시 시도해 주십시오.";
                  res.json({ code : rtCode
                            ,msg : rtMsg
                            ,isMsgView : false
                            ,cnt : 0
                           });
                }else{
                  db.query(_Query.getInterestCnt,[seq],function(err, rowInterestCnt, columns) {
                      if (err) {
                        rtMsg = "데이터 조회중 실패";
                      }else{
                        rtCode = 0;
                        rtMsg = "성공";

                      }
                      res.json({ code : rtCode
                                ,msg : rtMsg
                                ,isMsgView : false
                                ,cnt : rowInterestCnt[0].cnt
                               });
                  });
                }
            });

          }
      });

      _DBPool.release(db);

  });

});


module.exports = router;
