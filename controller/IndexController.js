// 前台首页控制器

var mysql = require('../models/db.js');
var markdown = require('markdown').markdown;

module.exports = {

	display: function (req, res) {
		var sqlt = "select id, tname from blog_type";
		var	sqla = "select id, tname, title, left (content,150) as art, addtime from blog_article";
		
		mysql.select(sqlt,function (results) {
			mysql.select(sqla, function (resu) {
				res.render('index',{types:results, info:resu});
				
			});
		});
	}, //显示首页

	type: function (req, res) {
		var tname = req.query.tname;
		var sqlt = "select id, tname from blog_type";
		var	sqla = "select id, tname, title, left (content,150) as art, addtime from blog_article where tname=?";
		
		mysql.select(sqlt,function (results) {
			mysql.query(sqla, [tname], function (resu) {
				res.render('index',{types:results, info:resu});
				
			});
		});
		
	}, //显示某一类文章

	article: function (req, res) {
		var aid = req.query.aid;
		
		
		var sqlt = "select id, tname from blog_type";
		var sqla = "select id, tname, title, content, addtime from blog_article where id=?";
		mysql.select(sqlt, function (results) {
			mysql.query(sqla, [aid], function (resu) {
				// console.log(resu);
				resu[0].content = markdown.toHTML(resu[0].content);
				res.render('home/article', {types: results, info:resu});
			});
		});

	} //显示某一篇文章，写入redis缓存

}

