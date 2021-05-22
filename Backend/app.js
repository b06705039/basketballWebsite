global.__BASE__ = process.cwd() + '/';
global.__MODULE_BASE__ = process.cwd() + '/routes/modules/';
global.__MODEL_BASE__ = process.cwd() + '/routes/models/';
global.__CONTROLLER_BASE__ = process.cwd() + '/routes/controllers/';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require(global.__MODULE_BASE__ + 'database');

var usersRouter = require(global.__CONTROLLER_BASE__ + 'users');
var postRouter = require(global.__CONTROLLER_BASE__ + 'posts');
var teamRouter = require(global.__CONTROLLER_BASE__ + 'teams');
var recorderRouter = require(global.__CONTROLLER_BASE__ + 'recorders');
var matchRouter = require(global.__CONTROLLER_BASE__ + 'matches');
var timeRouter = require(global.__CONTROLLER_BASE__ + 'times');
var cors = require('cors');

var app = express();
db.createPool();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/teams', teamRouter);
app.use('/recorders', recorderRouter);
app.use('/matches', matchRouter);
app.use('/time', timeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
