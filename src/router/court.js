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
router.post('/create', function(req, res) {
  var token = req.body.token;
  var id = req.body.id;
  var address = req.body.address;
  var addressShort = req.body.addressShort;
  var cname = req.body.cname;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var description = req.body.description;
  var picNameArray = req.body.picNameArray;
  var status = req.body.status;
  var category = req.body.category;

  console.log('token : ' + token + ' id : ' + id + ' address : ' + address
              +' addressShort : ' + addressShort +' cname : ' + cname  +' latitude : ' + latitude  +' longitude : ' + longitude  +' description : ' + description
              +' picNameArray : ' + picNameArray +' cname : ' + status +' category : ' + category

            );
  // var token = req.query.token;
  // var id = req.query.id;
  // var address = req.query.address;
  // var addressShort = req.query.addressShort;
  // var cname = req.query.cname;
  // var latitude = req.query.latitude;
  // var longitude = req.query.longitude;
  // var description = req.query.description;
  // var picNameArray = req.query.picNameArray;
  // var status = 'N';
  // var category = req.query.category;

  var status = 'N';
  var courtSeq=0;
  var rtCode=1;
  var rtMsg = '';
  var imgURL = 'https://decubeimageserver-guanho.c9users.io/download/clubful/court';
  var defaultImg = ' '



  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.getCourtSeq,[],function(err, row, columns) {
          if (err) {
            rtCode = 1;
            rtMsg = "코트등록에 실패하였습니다. 재시도 해주세요.";


          }else{
              courtSeq = row[0].courtSeq;
              for(var i =0; i<picNameArray.length; i++){
                if(picNameArray[i] == null || picNameArray[i] == ''){
                  picNameArray[i] = ' ';
                }else{
                  picNameArray[i] = imgURL+'/'+courtSeq+'/'+picNameArray[i];
                }

              }
              console.log("courtSeq : "+ courtSeq);
              db.query(_Query.insertCourt,[courtSeq, address
                , addressShort, cname, latitude
                , longitude, description
                , status, category, token],function(err, rowToken, columns) {
                  if (err) {
                    console.log(err);
                    return res.end("QUERY ERROR: " + err);
                  }else{
                    db.query(_Query.insertCourtImg,[picNameArray[0],picNameArray[1],picNameArray[2],picNameArray[3],picNameArray[4],picNameArray[5],courtSeq],function(err, rowToken, columns) {
                        if(err){
                            console.log(err);
                            return res.end("QUERY ERROR: " + err);
                        }else{
                          rtCode = 0;
                          rtMsg = "코트등록에 성공했습니다.";
                          console.log("courtSeq : "+ courtSeq);
                          res.json({ code : rtCode
                                    ,msg : rtMsg
                                    ,isMsgView : true
                                    ,seq : courtSeq
                                   });
                        }
                    });

                  }
              });
          }


      });
      _DBPool.release(db);

    });

});

router.post('/getList', function(req, res) {

  var token = req.body.token;
  var search = req.body.search;
  var category = req.body.category;

  console.log(token + ', ' + search + ', ' + category);

  // var token = req.query.token;
  // var address = req.query.address;
  // var category = req.query.category;

  var rtCode=1;
  var rtMsg = '';
  var getCourtQuery = '';

  if(category == '-1'){
    getCourtQuery = _Query.getCourtList2;
  }else{
    getCourtQuery = _Query.getCourtList;
  }
  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(getCourtQuery,[search,search, category],function(err, rowCourtList, columns) {

          if (err) {

            return res.end("QUERY ERROR: " + err);

          }else{
            console.log(getCourtQuery);
            console.log(rowCourtList);
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

router.post('/interest', function(req, res) {

  var token = req.body.token;
  var seq = req.body.seq;

  // var token = req.query.token;
  // var seq = req.query.seq;

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
            var tempYN = '';
            if(rowInterest[0] == null){
              //insert
              tempQuery = _Query.insertInterest;
              tempYN = 'Y';
            }else if(rowInterest[0].interest_yn == 'N'){
              //update
              tempQuery = _Query.updateInterest;
              tempYN = 'Y';
            }else{
              tempQuery = _Query.updateInterest;
              tempYN = 'N';
            }
            db.query(tempQuery,[tempYN, seq, token],function(err, rowCourtList, columns) {
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

router.post('/detail', function(req, res) {

  var token = req.body.token;
  var seq = req.body.seq;

  // var token = req.query.token;
  // var seq = req.query.seq;
  var rtCode=1;
  var rtMsg = '';

  _DBPool.acquire(function(err, db) {
      if (err) {
        res.json({ code : 1
                  ,msg : "디비 에러"
                  ,isMsgView : false
                 });
      }
      db.query(_Query.getCourt,[seq, seq],function(err, rowCourt, columns) {
          if (err) {
            res.json({ code : 1
                      ,msg : "디비 에러"
                      ,isMsgView : false
                     });
          }else{
            console.log(rowCourt);
            res.json({ code : 0
                      ,msg : ""
                      ,isMsgView : false
                      ,result : rowCourt[0]
                     });
          }
      });

      _DBPool.release(db);

  });

});

router.post('/replyInsert', function(req, res) {

  var token = req.body.token;
  var seq = req.body.seq;
  var context = req.body.context;
  var id = req.body.id;

  // var token = req.query.token;
  // var seq = req.query.seq;
  // var context = req.query.context;
  // var id = req.query.id;

  var rtCode=1;
  var rtMsg = '';
  _DBPool.acquire(function(err, db) {
      if (err) {
        var rtMsg = '커낵션 에러';
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.insertReply,[context, token, id, seq],function(err, rowReply, columns) {
          if (err) {
            var rtMsg = '디비 에러';
          }else{
            var rtCode=0;
            var rtMsg = '성공';
          }
          res.json({ code : rtCode
                    ,msg : rtMsg
                    ,isMsgView : false
                   });
      });

      _DBPool.release(db);

  });

});


module.exports = router;
