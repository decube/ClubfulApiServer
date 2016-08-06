var express = require('express');
var router = express.Router();
var _DBPool = require('../lib/datapool');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});
// define the about route
router.get('/about', function(req, res) {
  _DBPool.acquire(function(err, db) {
      if (err) {
        return res.end("CONNECTION error: " + err);
      }

      db.query("SELECT * FROM topic",[],function(err, rows, columns) {
          _DBPool.release(db);

          if (err) {
            return res.end("QUERY ERROR: " + err);
          }
          res.json({ result : true ,message: rows });
      });
  });


});

module.exports = router;
