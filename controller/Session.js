// 判断是否登录

module.exports = function(req, res, next) {
  if (!req.session.uname) {
    res.redirect('/admin/user/login');
  } else {
    next();
  }
}