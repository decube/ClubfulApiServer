var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var versionCheck = require('./src/router/versionCheck.js');
var certification = require('./src/router/certification.js');
var court = require('./src/router/court.js');
var user = require('./src/router/user.js');
var appjs = require('./src/router/app.js');
var location = require('./src/router/location.js');
var category = require('./src/router/category.js');
var reply = require('./src/router/reply.js');

app.use('/version', versionCheck);
app.use('/certification', certification);
app.use('/court', court);
app.use('/user', user);
app.use('/app', appjs);
app.use('/location', location);
app.use('/category', category);
app.use('/reply', reply);
app.use('/wv', express.static(__dirname + '/client/'));

app.listen(8080, function(){
    console.log('Connection 8080 port!');
});
