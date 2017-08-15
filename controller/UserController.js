// 用户操作模块，登录，注册，退出

//引入加密的模块
var bcrypt = require('bcryptjs');
//数据库模块
var mysql = require('../models/db.js');

module.exports = {
	
	//处理登录
	doLogin: function (req, res) {

		//根据用户提交的用户名查询得到加密后的密文，然后与用户提交密码进行验证
		var name = req.body.uname;
		var pass = req.body.upass;
		var online = req.body.online;
		var loginip = req.connection.remoteAddress.substr(7);
		var sql = 'select id,name,password,loginip from blog_user where name = ?';
		mysql.query(sql, [name], function (msg) {
			
			//验证密码是否正确
			bcrypt.compare(pass, msg[0].password, function (err, result) {
    			
    			if (result == true) {  
    				if (msg[0].loginip != loginip) { //如果登录ip改变
    					var sql1 = "update blog_user set loginip = ? where id = ?";
    					mysql.query(sql1,[loginip,msg[0].id],function (results) {}); 						
    					
    				}
    				// 跳转到后台首页，并把登录信息存入session
    					req.session.uname = req.body.uname; 
    					res.redirect('/admin');
    				
    			} else {
    				console.log('失败');
    			}
			});

		});
	},

	doLogout: function (req, res) {
		req.session = null;
		res.redirect('/');
	},

	//处理注册
	doReg: function(req,res) {
		var name = req.body.uname;
		var pass = req.body.pass;
		var logintime = Date.now();
		var loginip = req.ip;

		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(pass, salt, function(err, hash) {
		     	//hash是加密后的密码
		     	
		     	var sql = 'insert into blog_user(name,password,logintime,loginip) values(?,?,?,?)';

		     	mysql.query(sql, [name, hash, logintime, loginip], function (msg) {

		     		// console.log(msg);
		     		res.redirect('/admin/user/login');
		     	});

		    });
		});
	},


	//处理显示用户列表
	userList: function (req,res) {
		var sql = "select id,name,logintime,loginip from blog_user;";
		mysql.select(sql,function(results) {
			
			res.render('admin/user/list',{users:results}); //传递用户列表对象
			
		});
	}


};