//引入mysql模块，这个模块是通过cnpm install mysql安装
var mysql = require('mysql');


//连接数据库
var connection = mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : '625.com',
		  database : 'blog'
	});

//连接数据库
connection.connect();

module.exports = {


	query:  function (sql, attr, func) {

		connection.query(sql, attr, function (error, results, fields) {
			if (error) throw error;
			func(results);
		});
	},

	select: function (sql,func) {
		connection.query(sql, function (error, results, fields) {
			if (error) throw error;
			func(results);
		});
	}

};