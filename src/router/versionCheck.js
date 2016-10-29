var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/versionCheck')();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/check', function(req, res) {
  // var appType = req.body.appType;
  // var appVersion = req.body.appVersion;
  // var sendDate = req.body.sendDate;
  // var language = req.body.language;
  // var deviceId = req.body.deviceId;
  // var token = req.body.token;
  // var categoryVer = req.body.categoryVer;
  // var noticeVer = req.body.noticeVer;


  var deviceId = req.query.deviceId;
  var appType = req.query.appType;
  var appVersion = req.query.appVersion;
  var language = req.query.language;
  var categoryVer = req.query.categoryVer;
  var noticeVer = req.query.noticeVer;

  console.log(appType);
  console.log(appVersion);
  console.log(sendDate);
  console.log(language);
  console.log(deviceId);
  console.log(token);

  var rtCode=0;
  var rtMsg = '';
  var rtToken = '';
  var rtVer = '';
  var rtCategoryVer = '';
  var rtNoticeVer = '';
  var rtCategoryList = [];

  _DBPool.acquire(function(err, db) {
      if (err) {
        rtCode=1;
        return res.end("CONNECTION error: " + err);
      }

      db.query(_Query.getDevice,[deviceId],function(err, rowDevice, columns) {
          if (err) {
            rtCode=1;
            return res.end("QUERY ERROR: " + err);
          }else{
            if(rowDevice[0] == null){
              //새로운 유저 디바이스 생성
              db.query(_Query.getTokenSeq,[],function(err, rowToken, columns) {
                  if (err) {
                    return res.end("QUERY ERROR: " + err);
                  }else{
                    var hash = crypto.createHash('sha256').update('token'+rowToken[0]).digest('base64');
                    db.query(_Query.insertDevice,[hash, appType, appVersion, language, deviceId],function(err, rowToken, columns) {
                        if (err) {
                          return res.end("QUERY ERROR: " + err);
                        }else{
                          db.query(_Query.getDevice,[deviceId],function(err, rowReDevice, columns) {
                            if (err) {
                            }else{
                              rtToken = rowReDevice[0].token;
                              db.query(_Query.getNewCategoryVer,[],function(err, rowNewCategory, columns) {
                                  if (err) {
                                    rtCode=1;
                                    return res.end("QUERY ERROR: " + err);
                                  }else{
                                    rtCategoryVer = rowNewCategory[0].ver;
                                    console.log(rtCategoryVer);
                                    if(categoryVer == rowNewCategory[0].ver){

                                    }else{
                                      //다르면 카테고리 리스트 내려줌
                                      db.query(_Query.getCategoryList,[rowNewCategory[0].ver],function(err, rowCategoryList, columns) {

                                          if (err) {
                                            rtCode=1;
                                            return res.end("QUERY ERROR: " + err);
                                          }else{
                                            rtCategoryList = rowCategoryList;
                                            db.query(_Query.getNewNoticeVer,[],function(err, rowNewNotice, columns) {
                                                if (err) {
                                                  return res.end("QUERY ERROR: " + err);
                                                }else{
                                                  rtNoticeVer = rowNewNotice[0].ver;
                                                  res.json({ code : rtCode
                                                            ,msg : rtMsg
                                                            ,isMsgView : true
                                                            ,token : rtToken
                                                            ,ver : rtVer
                                                            ,categoryVer : rtCategoryVer
                                                            ,categoryLIst : rtCategoryList
                                                            ,noticeVer : rtNoticeVer});
                                                }
                                            });
                                          }
                                      });

                                    }
                                  }
                              });
                            }
                          });
                        }
                    });
                  }
              });
            }else{
              rtToken = rowDevice[0].token;
              db.query(_Query.getNewCategoryVer,[],function(err, rowNewCategory, columns) {
                  if (err) {
                    rtCode=1;
                    return res.end("QUERY ERROR: " + err);
                  }else{
                    rtCategoryVer = rowNewCategory[0].ver;
                    console.log(rtCategoryVer);
                    if(categoryVer == rowNewCategory[0].ver){

                    }else{
                      //다르면 카테고리 리스트 내려줌
                      db.query(_Query.getCategoryList,[rowNewCategory[0].ver],function(err, rowCategoryList, columns) {

                          if (err) {
                            rtCode=1;
                            return res.end("QUERY ERROR: " + err);
                          }else{
                            rtCategoryList = rowCategoryList;
                            db.query(_Query.getNewNoticeVer,[],function(err, rowNewNotice, columns) {
                                if (err) {
                                  return res.end("QUERY ERROR: " + err);
                                }else{
                                  rtNoticeVer = rowNewNotice[0].ver;
                                  res.json({ code : rtCode
                                            ,msg : rtMsg
                                            ,isMsgView : true
                                            ,token : rtToken
                                            ,ver : rtVer
                                            ,categoryVer : rtCategoryVer
                                            ,categoryLIst : rtCategoryList
                                            ,noticeVer : rtNoticeVer});
                                }
                            });
                          }
                      });

                    }
                  }
              });
            }

          }



      });
      _DBPool.release(db);

  });

});


module.exports = router;
