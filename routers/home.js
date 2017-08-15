// 前端路由

var express = require('express');
var indexCtr = require('../controller/IndexController.js');

// 创建一个路由对象
var router = express.Router();

//get方式
router.get('/',function (request, response, next) {

	indexCtr.display(request, response);

});

//类别
router.get('/type',function (request, response, next) {

	indexCtr.type(request, response);

});

//文章
router.get('/article',function (request, response, next) {

	indexCtr.article(request, response);

});

//游戏
router.get('/game/plane', function (request, response, next) {
	response.render('game/plane');
});

module.exports = router;