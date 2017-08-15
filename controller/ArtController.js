
var mysql = require('../models/db.js');


module.exports = {
	artadd: function (req,res) {
		var sql = "select tname from blog_type";
		mysql.select(sql, function (results) {
			res.render('admin/article/add',{types:results});
		});
	}, //显示增加页面

	doAdd:function (req,res) {
		var tname = req.body.tname;
		var title = req.body.title;
		var sort = req.body.sort;
		var status = req.body.status;
		var content = req.body.content; //提交的文章内容
		var sql = "insert into blog_article(tname,title,sort,content,status) values(?,?,?,?,?)";
		mysql.query(sql,[tname,title,sort,content,status], function (results) {
			res.redirect('/admin/article/list');
		});
	}, //执行增加文章操作
		

	artlist: function (req,res) {
		var sql = "select id, tname, title, click, sort, addtime, status from blog_article";
		mysql.select(sql, function (results) {
			res.render('admin/article/list',{info: results});
		});
	}, //文章列表

	artedit: function (req,res) {
		var aid = req.query.aid;
		var sql = "select id,tname,title,click,sort,addtime,status,content from blog_article where id = ?";
		var sql1 = "select id,tname from blog_type";
		mysql.query(sql,[aid],function (results) {
			mysql.select(sql1, function (resu) {
				res.render('admin/article/edit',{info:results, types:resu});
			});
			
		});
	},//文章编辑页面

	doEdit: function (req,res) {
		
		var sql = "update blog_article set tname=?, title=?, click=?, sort=?, status=?, content=? where id = ?";
		var data = [req.body.tname, req.body.title, req.body.click, req.body.sort, req.body.status, req.body.content,req.body.id];
		mysql.query(sql,data,function (results) {
			
			res.redirect('/admin/article/list');
		});
	}, //文章编辑操作

	artdel: function (req,res) {
		var aid = req.query.aid;
		var sql = "delete from blog_article where id = ?";
		mysql.query(sql,[aid],function (results) {
			res.redirect('/admin/article/list');
		});
	} //删除文章
}