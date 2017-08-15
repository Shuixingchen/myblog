// 加载express框架模块
var express = require('express');

var app = express(); 
// 加载bodyParser模块，express注册这个模块之后，
// 对应的response.body就可以拿到post数据；
var bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({extended: true}) );


var session = require('express-session');
app.use(session({
             secret: '12345',
              name: 'testapp',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
              cookie: {maxAge: 800000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
              resave: false,
              saveUninitialized: true,
       }));

app.set('views', __dirname + '/views');
// 配置模板引擎，后缀html的文件就可以解析了
app.engine('html', require('ejs').__express);
app.set('view engine','html');

//将public模块设置成为资源目录
app.use('/public', express.static(__dirname + '/public') );

//后台路由,以'/admin'开头的路径就去后台路由匹配
app.use('/admin', require('./routers/admin.js') );

//前台路由
app.use('/', require('./routers/home.js') );

// 监听端口
app.listen(3000);