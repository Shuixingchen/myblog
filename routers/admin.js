var express = require('express');

// 创建一个路由对象
var router = express.Router();
var userCtr = require('../controller/UserController.js'); //用户处理器
var artCtr = require('../controller/ArtController.js'); //文章处理器
var typeCtr = require('../controller/TypeController.js'); //分类处理器
var filter = require('../controller/Session.js'); 


//后台首页
router.get('/',filter,function (request, response, next) {

	response.render('admin/index');//返回 views/index.html页面

});

//后台注册页
router.get('/user/register',function (request, response, next) {

	response.render('admin/user/register');

});

//后登录页
router.get('/user/login',function (request, response, next) {

	response.render('admin/user/login');

});

//用户列表页
router.get('/user/list',filter, function (request, response, next) {

	userCtr.userList(request, response);

});

router.get('/user/logout', function (request, response, next) {
	userCtr.doLogout(request, response);
});


// 添加分类页
router.get('/type/add',filter, function (request, response, next) {
	response.render('admin/type/add');

});

router.get('/type/list', filter, function (request, response, next) {
	typeCtr.typelist(request, response);
});

router.get('/type/edit', filter, function (request, response, next) {
	typeCtr.typeedit(request, response);
});

router.get('/type/del', filter, function (request, response, next) {
	typeCtr.typedel(request, response);
});




//显示文章列表
router.get('/article/list', filter, function (request, response, next) {
	artCtr.artlist(request, response);
});

router.get('/article/add', filter, function (request, response, next) {
	artCtr.artadd(request, response);
});

router.get('/article/edit', filter, function (request, response, next) {

	artCtr.artedit(request, response);
});

router.get('/article/del', filter, function (request, response, next) {

	artCtr.artdel(request, response);
});








//处理注册
router.post('/user/doReg',function (request, response, next) {
	userCtr.doReg(request, response);
	
});

//处理登录
router.post('/user/doLogin',function (request, response, next) {
	userCtr.doLogin(request, response);
	
});

//处理增加分类
router.post('/type/doAdd',function (request, response, next) {
	typeCtr.typeadd(request, response);
	
});

// 处理分类编辑动作
router.post('/type/doEdit',function (request, response, next) {
	typeCtr.typedoEdit(request, response);
	
});

// 处理文章添加
router.post('/article/doAdd',function (request, response, next) {
	artCtr.doAdd(request, response);
	
});

// 文章编辑
router.post('/article/doEdit',function (request, response, next) {
	artCtr.doEdit(request, response);
	
});




module.exports = router;