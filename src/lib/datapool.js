var generic_pool = require('generic-pool');
var mysql = require('mysql');
var pool = generic_pool.Pool({
        name: 'mysql',
        create: function(callback) {
                var config = {
                        host : 'localhost',
                        port : '3306',
                        user : 'clubful',
                        password : 'Qwas@cl!test1!!',
                        database : 'clubful'
                }
                var client = mysql.createConnection(config);
                client.connect(function (error){
                  if(error){
                    console.log(error);
                  }
                  callback(error, client);
                });
        },
        destroy: function(client) {
          client.end();
        },
        min: 7,
        max: 10,
        idleTimeoutMillis : 300000,
        log : false
});

process.on("exit", function() {
  pool.drain(function () {
    pool.destroyAllNow();
  });
});


module.exports = pool;
