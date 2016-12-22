var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/wv', express.static(__dirname + '/../../client/'));

// // middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   console.log('Time: ', Date.now());
//   next();
// });
//
// function resultRes(name, res){
//   fs.readFile(__dirname+'/../../client/'+name+'.html', function(error, data){
//     if(error){
//       console.log(error);
//     }else{
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data);
//     }
//   });
// }
//
// router.get('/guide', function(req, res) {
//   resultRes('guide', res)
// });
// router.get('/info', function(req, res) {
//   resultRes('info', res)
// });
// router.get('/inquiry', function(req, res) {
//   resultRes('inquiry', res)
// });
// router.get('/notice', function(req, res) {
//   resultRes('notice', res)
// });
//
//
// router.get('/resources/:image', function(req, res){
//   var image = req.params.image;
//   var imagePath = __dirname+'/../../client/resources/'+image;
//   console.log(imagePath);
//   fs.readFile(imagePath, function(error, data){
//     if(error != null){
//       res.writeHead(404);
//       res.end(data);
//     }else{
//       res.writeHead(200, {'Content-Type': 'image/png'});
//       res.end(data);
//     }
//   });
// });


module.exports = router;
