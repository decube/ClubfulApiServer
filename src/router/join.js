var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/join')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {

  // var userId = req.body.userId;
  // var token = req.body.token;
  // var password = req.body.password;
  // var gcmId = req.body.gcmId;
  // var nickName = req.body.nickName;
  // var sex = req.body.sex;
  // var birth = req.body.birth;
  // var userLatitude = req.body.userLatitude;
  // var userLongitude = req.body.userLongitude;
  // var userAddress = req.body.userAddress;
  // var userAddressShort = req.body.userAddressShort;
  // var noticePush = req.body.noticePush;
  // var myInsertPush = req.body.myInsertPush;
  // var distancePush = req.body.distancePush;
  // var interestPush = req.body.interestPush;
  // var startTime = req.body.startTime;
  // var endTime = req.body.endTime;

  var userId = req.query.userId;
  var token = req.query.token;
  var password = req.query.password;
  var gcmId = req.query.gcmId;
  var nickName = req.query.nickName;
  var sex = req.query.sex;
  var birth = req.query.birth;
  var userLatitude = req.query.userLatitude;
  var userLongitude = req.query.userLongitude;
  var userAddress = req.query.userAddress;
  var userAddressShort = req.query.userAddressShort;
  var noticePush = req.query.noticePush;
  var myInsertPush = req.query.myInsertPush;
  var distancePush = req.query.distancePush;
  var interestPush = req.query.interestPush;
  var startTime = req.query.startTime;
  var endTime = req.query.endTime;


  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query(_Query.checkUser,[userId],function(err, rowDevice, columns) {
          if (err) {
            return res.end("QUERY ERROR: " + err);
          }else{
            if(rowDevice[0] == null){
              //가입이 가능함.
              db.query(_Query.insertUser,[userId
                , password, nickName, sex, birth
                , userLatitude, userLongitude, userAddress
                , userAddressShort, noticePush, myInsertPush
                , distancePush, interestPush, startTime, endTime],function(err, rowToken, columns) {
                  if (err) {
                    return res.end("QUERY ERROR: " + err);
                  }else{
                    rtCode = 0;
                    rtMsg = "ClubFul 회원이 되신것을 환영 합니다.";
                    res.json({ code : rtCode
                              ,msg : rtMsg
                              ,isMsgView : true
                             });
                  }
              });
            }else{
              rtCode = 1;
              rtMsg = "이미 가입 되어 있는 ID 입니다.";
              res.json({ code : rtCode
                        ,msg : rtMsg
                        ,isMsgView : true
                       });
            }

          }
      });
      _DBPool.release(db);

  });

});


module.exports = router;
