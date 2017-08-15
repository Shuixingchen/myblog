
var mysql = require('../models/db.js');


module.exports = {

	typeadd: function (req,res) {
		var tname = req.body.tname;
		var sql = "insert into blog_type(tname) values(?)";
		mysql.query(sql,[tname],function (results) {
			console.log(results);
			res.redirect('/admin/type/list');
		});
	}, //增加分类

	typelist: function (req,res) {
		var sql = "select id, tname from blog_type";
		mysql.select(sql, function (results) {
			res.render('admin/type/list',{types:results});
		});
	}, //显示分类

	typeedit: function (req,res) {
		var tid = req.query.tid;
		var sql = "select id, tname from blog_type where id = ?";

		mysql.query(sql,[tid],function (results) {
			
			res.render('admin/type/edit',{type:results});
		});
	}, //显示编辑分类

	typedoEdit: function (req,res) {
		var tname = req.body.tname;
		var tid = req.body.tid;
		var sql = "update blog_type set tname =? where id = ?";

		mysql.query(sql,[tname,tid],function (results) {
			res.redirect('/admin/type/list');
		});
	}, //处理编辑分类

	typedel: function (req,res) {
		var tid = req.query.tid;
		var sql = "delete from blog_type where id =?";
		mysql.query(sql,[tid],function (results) {
			
			res.redirect('/admin/type/list');
		});
	} //删除分类

}