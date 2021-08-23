var mysql = require('mysql');

var dbConn = mysql.createConnection({
  host: "localhost",
  database: "bdreqbot",
  user: "root",
  password: "root"
});

dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database connected!");
});


module.exports = dbConn;