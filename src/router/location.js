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
  formatter: 'string'
};

var geocoder = NodeGeocoder(options);

router.use(function timeLog(req, res, next) {
  res.setHeader("Content-Type", "application/json");
  console.log('Time: ', Date.now());
  next();
});
// define the home page route

router.get('/geocode', function(req, res) {

  //
  // var token = req.body.token;
  // var paramAddress = req.body.address;
  // var latitude = req.body.latitude;
  // var longitude = req.body.longitude;
  // var language = req.body.language;

  var token = req.query.token;
  var address = req.query.address;
  var latitude = req.query.latitude;
  var longitude = req.query.longitude;
  var language = req.query.language;


  var rtCode=1;
  var rtMsg = '';
  var result;

  if((address == null || address == '') && (latitude != null && latitude != '' && longitude != null && longitude != '')){
    geocoder.reverse({lat:latitude, lon:longitude})
    .then(function(res) {
      rtCode=0;
      result = res;
    })
    .catch(function(err) {
      rtMsg = err;
      console.log(err);
    });
  }else if(address != null && address != ''){
    geocoder.geocode({address: paramAddress, countryCode: language, minConfidence: 0.5, limit: 5}, function(err, res) {
      rtCode=0;
      result = res;
    });
  }else{
    rtMsg = '필수정보 부족.';
  }

  res.json({ code : rtCode
            ,msg : rtMsg
            ,isMsgView : false
            ,results : result
           });
});

module.exports = router;
