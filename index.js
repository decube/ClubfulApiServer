var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var main = require('./src/router/main.js');
var versionCheck = require('./src/router/versionCheck.js');
var certification = require('./src/router/certification.js');
var court = require('./src/router/court.js');
var user = require('./src/router/user.js');
var appjs = require('./src/router/app.js');
var location = require('./src/router/location.js');
var wv = require('./src/router/wv.js');

app.use('/main', main);
app.use('/version', versionCheck);
app.use('/certification', certification);
app.use('/court', court);
app.use('/user', user);
app.use('/app', appjs);
app.use('/location', location);
app.use('/wv', express.static(__dirname + '/client/'));
///app.use('/wv', wv);
console.log(__dirname + '/client/');

app.listen(8080, function(){
    console.log('Connection 8080 port!');
});
