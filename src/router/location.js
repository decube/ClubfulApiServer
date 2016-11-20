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
// define the home page route

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

  if((paramAddress == null || paramAddress == '') && (latitude != null && latitude != '' && longitude != null && longitude != '')){
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

module.exports = router;
