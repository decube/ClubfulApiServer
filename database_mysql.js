var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'abcdabcd!',
  database : 'abcdabcd'
});

connection.connect();

// connection.query('select 1 from dual', function(err, rows, fields) {
//   if (err) throw err;
//
//   console.log('The solution is: ', rows[0].solution);
// });

// var sql = 'INSERT INTO topic (title, description, author) values(?,?,?)';
// var params = ['C++', 'Watcher', 'graphittie'];
// connection.query(sql,params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows.insertId);
//   }
// });

// var sql = 'update topic set title=?, author=? where id = ?';
// var params = ['smkim', 'smkim', '7'];
// connection.query(sql,params, function(err, rows, fields){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(rows);
//   }
// });
var sql = 'delete from topic where id = ?';
var params = ['7'];
connection.query(sql,params, function(err, rows, fields){
  if(err){
    console.log(err);
  }else{
    console.log(rows);
  }
});

connection.end();
