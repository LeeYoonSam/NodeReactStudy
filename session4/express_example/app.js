var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// flash 메시지 관련
var flash = require('connect-flash');

// passport 로그인 관련
var passport = require('passport');
var session = require('express-session');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var autoIncrement = require('mongoose-auto-increment');



// === 몽고디비 관련 세팅 시작 ===
// 몽구스 연결 상태 로그(없어도 상관없음)
var db = mongoose.connection;
db.on('error', console.error);
db.on('open', function() {
    console.log("MongoDB Connect");
});
// 몽구스 연결 상태 로그

// 몽고디비 연결
var connect = mongoose.connect('mongodb://127.0.0.1:27017/exercise');

// autoIncrement 초기화
autoIncrement.initialize(connect);
// === 몽고디비 관련 세팅 끝 ===



// === 라우트 관련 세팅 ===
var index = require('./routes/index');
var users = require('./routes/users');
// Router 추가
var posts = require('./routes/posts');
var accounts = require('./routes/accounts');
var auth = require('./routes/auth');
var chat = require('./routes/chat');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// multer로 이미지 업로드에 사용할 폴더 정의
app.use('/uploads', express.static('uploads'));

//=== 미들웨어는 꼭 라우팅 위에 선언해야함 ===
//session 관련 셋팅
// 미들웨어로 변경
var sessionMiddleWare = session({
    secret: 'fastcampus',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 2000 * 60 * 60 //지속시간 2시간
    }
});

app.use(sessionMiddleWare);

// app.use(session({
//     secret: 'fastcampus',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 2000 * 60 * 60 //지속시간 2시간
//     }
// }));

//passport 적용
app.use(passport.initialize());
app.use(passport.session());


// 플래시 메시지 관련
app.use(flash());

// 로그인 정보 뷰에서만 변수로 셋팅, 전체 미들웨어는 router 위에 두어야 에러가 안난다.
app.use(function(req, res, next) {
  app.locals.isLogin = req.isAuthenticated();
  // app.locals.urlparameter = req.url; // 현재 URL 정보를 보내고 싶으면 이와같이 세팅
  // app.locals.userData = req.user; // 사용자 정보를 보내고 싶으면 이와 같이 세팅
  next();
});

//=== 미들웨어는 꼭 라우팅 위에 선언해야함 ===


// === 라우트 세팅 ===
app.use('/', index);
app.use('/users', users);
// Router 추가
app.use('/posts', posts);
app.use('/accounts', accounts);
app.use('/auth', auth);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

//socket io 셋팅
app.io = require('socket.io')();

app.io.use(function(socket, next) {
  sessionMiddleWare(socket.request, socket.request.res, next);
});

// 소켓 커넥션 미들웨어 사용하도록 수정
require('./libs/socketConnection')(app.io);

module.exports = app;
