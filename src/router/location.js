var express = require('express');
var bodyParser = require('body-parser');
var NodeGeocoder = require('node-geocoder');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var _DBPool = require('../lib/datapool');
var _Query = require('../query/location')();

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyBsqZlmvOUEKVHnca-3vXoHB-zODK-LroE',
  formatter: 'String',
  language: 'ko'
};


var geocoder = NodeGeocoder(options);

router.use(function timeLog(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  console.log('Time: ', Date.now());
  next();
});

router.post('/geocode', function(req, res) {


  var token = req.body.token;
  var paramAddress = req.body.address;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var language = req.body.language;

  // var token = req.query.token;
  // var paramAddress = req.query.address;
  // var latitude = req.query.latitude;
  // var longitude = req.query.longitude;
  // var language = req.query.language;

  var rtCode=1;
  var rtMsg = '';
  var rtResult = '';

  console.log('token : ' + token + ' paramAddress : ' + paramAddress + ' latitude : ' + latitude
              +' longitude : ' + longitude +' language : ' + language
             );

  if((paramAddress == null || paramAddress == '' || paramAddress == 'undefined') && (latitude != null && latitude != '' && longitude != null && longitude != '')){
    geocoder.reverse({lat:latitude, lon:longitude})
    .then(function(geoRes) {
      rtCode=0;
      rtResult = res;
      res.json({ code : rtCode
                ,msg : rtMsg
                ,isMsgView : false
                ,results : rtResult
               });
    })
    .catch(function(geoErr) {
      rtMsg = err;
      res.json({ code : rtCode
                ,msg : rtMsg
                ,isMsgView : false
                ,results : rtResult
               });
    });
  }else if(paramAddress != null && paramAddress != ''){
    geocoder.geocode({address: paramAddress, countryCode: language, minConfidence: 0.5, limit: 5}, function(err, geoRes) {
      rtCode=0;
      rtResult = geoRes;

      res.json({ code : rtCode
                ,msg : rtMsg
                ,isMsgView : false
                ,results : rtResult
               });
    });
  }else{
    rtMsg = '필수정보 부족.';
    res.json({ code : rtCode
              ,msg : rtMsg
              ,isMsgView : false
              ,results : rtResult
             });
  }


});

router.get('/getList', function(req, res) {

  // var token = req.body.token;
  // var address = req.body.address;
  // var category = req.body.category;

  var token = req.query.token;
  var address = req.query.address;
  var category = req.query.category;

  var rtCode=1;
  var rtMsg = '';

  if(category == -1){
    category='';
  }
  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.getCourtList,[address, category],function(err, rowCourtList, columns) {
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

router.post('/user', function(req, res) {

  var token = req.body.token;
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  console.log('token : ' + token + ' latitude : ' + latitude + ' longitude : ' + longitude);
  var rtCode=1;
  var rtMsg = '유저 위치 등록 실패.';

  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }
      db.query(_Query.insertLocation,[token, latitude, longitude],function(err, row, columns) {
          if (err) {
            console.log(err);
            return res.end("QUERY ERROR: " + err);
          }else{
            res.json({ code : 0
                      ,msg : '유저위치 등록 성공'
                      ,isMsgView : false
                      ,cnt : 0
                     });

          }
      });

      _DBPool.release(db);

  });

});

module.exports = router;
