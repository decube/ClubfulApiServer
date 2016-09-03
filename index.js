var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var versionCheck = require('./src/router/versionCheck.js');
var join = require('./src/router/join.js');
var join = require('./src/router/court.js');

app.use('/versionCheck', versionCheck);
app.use('/join', join);
app.use('/court', court);

app.listen(3000, function(){
    console.log('Connection 3000 port!');
});
