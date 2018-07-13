var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//-------------------------------------------------------
// 增加以下的require
//-------------------------------------------------------
var moment = require('moment');
var bookrank = require('./routes/bookrank');
var pointrank = require('./routes/pointrank');
var discuss = require('./routes/discuss');
var discuss2 = require('./routes/discuss2');
var discuss3 = require('./routes/discuss3');
var rules = require('./routes/rules');
var personal = require('./routes/personal');
var personal0 = require('./routes/personal0');
var personal2 = require('./routes/personal2');
//-------------------------------------------------------
// 增加以下的require descuss中的search
//-------------------------------------------------------
var bookListByPage = require('./routes/bookListByPage');
var bookSearchByName = require('./routes/bookSearchByName');
//-------------------------------------------------------
// 增加以下的require index中的login
//-------------------------------------------------------
var loginForm = require('./routes/loginForm');
var login = require('./routes/login');
var logout = require('./routes/logout');
var loginFail = require('./routes/loginFail');
var logout = require('./routes/logout');
var loginSuccess = require('./routes/loginSuccess');
//-------------------------------------------------------
// 增加以下的require user登入成功後可進入的介面
//-------------------------------------------------------
var userIndex = require('./routes/userIndex');
var userbookrank = require('./routes/userbookrank');
var userpointrank = require('./routes/userpointrank');
var userDiscuss = require('./routes/userDiscuss');
var userDiscuss2 = require('./routes/userDiscuss2');
var userDiscuss3 = require('./routes/userDiscuss3');
var userRules = require('./routes/userRules');
//-------------------------------------------------------
// 增加以下的require index中的register
//-------------------------------------------------------
var register = require('./routes/register');




var app = express();

//-----------------------------------------
// 增加使用session及uuid
//-----------------------------------------
var session=require('express-session');
var uuid=require('uuid');

app.use(session({
    genid:function(req){
        return uuid.v1();
    },
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true
}));
//-----------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//-------------------------------------------------------
// 增加以下的app.use()
//-------------------------------------------------------
app.use('/bookrank',bookrank);
app.use('/pointrank',pointrank);
app.use('/discuss', discuss);
app.use('/discuss2', discuss2);
app.use('/discuss3', discuss3);
app.use('/rules', rules);
app.use('/personal', personal);
app.use('/personal0',personal0);
app.use('/personal2',personal2);
//-------------------------------------------------------
// 增加以下的app.use() descuss中的search
//-------------------------------------------------------
app.use('/bookListByPage', bookListByPage);
app.use('/bookSearchByName', bookSearchByName);
//-------------------------------------------------------
// 增加以下的require index中的login
//-------------------------------------------------------
app.use('/loginForm', loginForm);
app.use('/login', login);
app.use('/logout', logout);
app.use('/loginFail', loginFail);
app.use('/logout', logout);
app.use('/loginSuccess', loginSuccess);
//-------------------------------------------------------
// 增加以下的require user登入後可使用的介面
//-------------------------------------------------------
app.use('/userIndex', userIndex);
app.use('/userbookrank', userbookrank);
app.use('/userpointrank', userpointrank);
app.use('/userDiscuss',userDiscuss);
app.use('/userDiscuss2', userDiscuss2);
app.use('/userDiscuss3', userDiscuss3);
app.use('/userRules', userRules);
//-------------------------------------------------------
// 增加以下的app.use() index中的register
//-------------------------------------------------------
app.use('/register', register);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//-------------------------------------------------------
// 增加以下的function
//-------------------------------------------------------
app.locals.myDateFormat = function(date){
  return moment(date).format('YYYY-MM-DD');
};

module.exports = app;
