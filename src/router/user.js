var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/user')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/login', function(req, res) {

  // var userId = req.body.userId;
  // var token = req.body.token;
  // var password = req.body.password;
  // var loginType = req.body.loginType;
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
  var loginType = req.query.loginType;
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
  var retUserId = '';
  var retNickName = '';
  var retSex = '';
  var retUserLatitude = '';
  var retUserLongitude = '';
  var retUserAddress = '';
  var retUserAddressShort = '';
  var retBirth = '';
  var retStartTime = '';
  var retEndTime = '';
  var retNoticePush = '';
  var retMyCreateCourtPush = '';
  var retDistancePush = '';
  var retInterestPush = '';

  var hash = crypto.createHash('sha256').update(password).digest('base64');
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
              if(loginType == '1'){
                rtCode = 1;
                rtMsg = "ID를 확인해 주십시오.";
              }else{
                //카톡이나 페이스북 비밀번호가 없음.
                db.query(_Query.insertUser,[userId
                  , hash, nickName, sex, birth
                  , userLatitude, userLongitude, userAddress
                  , userAddressShort, noticePush, myInsertPush
                  , distancePush, interestPush, startTime, endTime],function(err, rowToken, columns) {
                    if (err) {
                      return res.end("QUERY ERROR: " + err);
                    }else{
                      rtCode = 0;
                      rtMsg = "로그인 성공.";
                      db.query(_Query.updateDevice,[gcmId, userId, token],function(err, rowToken, columns) {
                          if (err) {
                            return res.end("QUERY ERROR: " + err);
                          }else{
                            db.query(_Query.getUserDevice,[userId],function(err, rowDevice, columns) {
                                if (err) {
                                  return res.end("QUERY ERROR: " + err);
                                }else{
                                  rtCode = 0;
                                  rtMsg = "로그인 성공.";
                                  retUserId = rowDevice.user_id;
                                  retNickName = rowDevice.NickName;
                                  retSex = rowDevice.sex;
                                  retUserLatitude = rowDevice.userLatitude;
                                  retUserLongitude = rowDevice.userLongitude;
                                  retUserAddress = rowDevice.userAddress;
                                  retUserAddressShort = rowDevice.userAddressShort;
                                  retBirth = rowDevice.birthDay;
                                  retStartTime = rowDevice.push_start_time;
                                  retEndTime = rowDevice.push_end_time;
                                  retNoticePush = rowDevice.is_notice_push;
                                  retMyCreateCourtPush = rowDevice.is_insert_push;
                                  retDistancePush = rowDevice.is_distance_push;
                                  retInterestPush = rowDevice.is_interest_push;
                                }
                            });
                          }
                      });
                    }
                });
              }
            }else{
              if((loginType == '1' && rowDevice[0].password == hash) || loginType=='2' || loginType=='3'){
                db.query(_Query.updateDevice,[gcmId, userId, token],function(err, rowToken, columns) {
                    if (err) {
                      return res.end("QUERY ERROR: " + err);
                    }else{
                      db.query(_Query.getUserDevice,[userId],function(err, rowDevice, columns) {
                          if (err) {
                            return res.end("QUERY ERROR: " + err);
                          }else{
                            rtCode = 0;
                            rtMsg = "로그인 성공.";
                            retUserId = rowDevice.user_id;
                            retNickName = rowDevice.NickName;
                            retSex = rowDevice.sex;
                            retUserLatitude = rowDevice.userLatitude;
                            retUserLongitude = rowDevice.userLongitude;
                            retUserAddress = rowDevice.userAddress;
                            retUserAddressShort = rowDevice.userAddressShort;
                            retBirth = rowDevice.birthDay;
                            retStartTime = rowDevice.push_start_time;
                            retEndTime = rowDevice.push_end_time;
                            retNoticePush = rowDevice.is_notice_push;
                            retMyCreateCourtPush = rowDevice.is_insert_push;
                            retDistancePush = rowDevice.is_distance_push;
                            retInterestPush = rowDevice.is_interest_push;
                          }
                      });
                    }
                });
              }else{
                rtCode = 1;
                rtMsg = '비밀번호를 확인해 주세요.';
              }
            }
          }
          res.json({ code : rtCode
                    ,msg : rtMsg
                    ,isMsgView : true
                    ,userId : retUserId
                    ,nickName : retNickName
                    ,sex : retSex
                    ,userLatitude : retUserLatitude
                    ,userLongitude : retUserLongitude
                    ,userAddress : retUserAddress
                    ,userAddressShort : retUserAddressShort
                    ,birth : retBirth
                    ,startTime : retStartTime
                    ,endTime : retEndTime
                    ,noticePush : retNoticePush
                    ,myCreateCourtPush : retMyCreateCourtPush
                    ,distancePush : myDistancePush
                    ,interestPush : myInsertPush
                   });
      });

      _DBPool.release(db);

  });

});


module.exports = router;
