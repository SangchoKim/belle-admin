const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sesseion = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const {sequelize} = require('./models');
const indexRouter = require('./routes/index');
const mainRouter = require('./routes/main')
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
require('dotenv').config();
const passportConfig = require('./passport');
const app = express();
sequelize.sync();
passportConfig(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port',process.env.PORT||3000);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sesseion({
  resave:false,
  saveUninitialized: false,
  secret:process.env.COOKIE_SECRET,
  cookie:{
    httpOnly:true,
    secure:false,
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/main', mainRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);

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

app.listen(app.get('port'),()=>{
 console.log(app.get('port'),'번 포트에서 대기 중');
});

module.exports = app;
