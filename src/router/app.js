var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _UserQuery = require('../query/user')();
var _DeviceQuery = require('../query/device')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/setting', function(req, res) {

  // var userId = req.body.userId;
  // var token = req.body.token;
  // var startTime = req.body.startTime;
  // var endTime = req.body.endTime;
  // var noticePush = req.body.noticePush;
  // var myCreateCourtPush = req.body.myCreateCourtPush;
  // var distancePush = req.body.distancePush;
  // var interestPush = req.body.interestPush;

  var userId = req.query.userId;
  var token = req.query.token;
  var noticePush = req.query.noticePush;
  var myCreateCourtPush = req.query.myCreateCourtPush;
  var interestPush = req.query.interestPush;
  var distancePush = req.query.distancePush;
  var startTime = req.query.startTime;
  var endTime = req.query.endTime;

  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query(_UserQuery.checkUser,[userId],function(err, rowDevice, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            if(rowDevice[0] == null){
              //가입이 가능함.
              rtCode = 1;
              rtMsg = "유저 정보가 없습니다.";
              res.json({ code : rtCode
                        ,msg : rtMsg
                        ,isMsgView : true
                       });
            }else{
              db.query(_UserQuery.updateUserSetting,[noticePush, myCreateCourtPush, interestPush
                                    ,distancePush, startTime, endTime, userId],function(err, updateRow, columns) {
                if(err){
                  rtMsg = '정보 업데이트중 오류. 다시 시도해 주십시오.';
                }else{
                  var rtCode=0;
                  var rtMsg = '정보가 수정 되었습니다.';
                  res.json({ code : rtCode
                            ,msg : rtMsg
                            ,isMsgView : true
                           });
                }

              });
            }

          }
      });
      _DBPool.release(db);

  });

});


//최신 앱버전

router.get('/version', function(req, res) {

  // var appType = req.body.appType;
  // var token = req.body.token;


  var appType = req.query.appType;
  var token = req.query.token;


  var rtCode=1;
  var rtMsg = '';
  var rtAppVersion = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query(_DeviceQuery.getNewestDevice,[appType],function(err, rowDevice, columns) {
          if (err) {
            rtMsg = '정보 조회 중 오류 다시 시도해 주십시오.';
          }else{
            var rtCode=1;
            var rtMsg = '';
            rtAppVersion = rowDevice[0].ver;

          }
          res.json({ code : rtCode
                    ,msg : rtMsg
                    ,appVersion = rtAppVersion
                    ,isMsgView : true
                   });
      });

      _DBPool.release(db);

  });

});

module.exports = router;
