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

app.use('/version', versionCheck, {
    setHeaders: function(res) {
        res.setHeader("Content-Type", "application/json");
    }
});
app.use('/certification', certification, {
    setHeaders: function(res) {
        res.setHeader("Content-Type", "application/json");
    }
});
app.use('/court', court, {
    setHeaders: function(res) {
        res.setHeader("Content-Type", "application/json");
    }
});
app.use('/user', user, {
    setHeaders: function(res) {
        res.setHeader("Content-Type", "application/json");
    }
});
app.use('/app', appjs, {
    setHeaders: function(res) {
        res.setHeader("Content-Type", "application/json");
    }
});

app.listen(8080, function(){
    console.log('Connection 8080 port!');
});
