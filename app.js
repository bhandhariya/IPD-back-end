var createError = require('http-errors');
var favicon = require('serve-favicon');
var db=require('./db');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// mongoose.connect(config.database,{useNewUrlParser:true},function(){console.log('db ready')})

var indexRouter = require('./routes/index');
var hospitalRouter=require('./routes/hospital_router');
var patientRouter=require('./routes/paitent_router');
var serviceRouter=require('./routes/service_router');
var billingRouter=require('./routes/billing_router');


var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hospital',hospitalRouter);
app.use('/patient',patientRouter);
app.use('/service',serviceRouter);
app.use('/billing',billingRouter);



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

module.exports = app;
