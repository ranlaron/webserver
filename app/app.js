var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session: expressSession});
var dbConn = require('./model/db_connection');
var app = express();
// var routes = require('./routes')(app);

// var index = require('./routes/index');
// var users = require('./routes/users');


// view engine setup
// app.set('views', path.join(__dirname, 'views'));

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
// app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
//app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// dbConn.getDBConnection(function (currentDB) {
//   app.use(cookieParser('SECRET'));
//   app.use(expressSession({
//     secret: 'SECRET',
//     // saveUninitialized: true,
//     // resave: true,
//     cookie: {maxAge: 60000 * 15},
//     store: new mongoStore({
//       db: currentDB,
//       collection: 'sessions'
//     })
//   }));
//
// });

require('./../bin/routes')(app);

// app.use('/', index);
// app.use('/users', users);

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



module.exports = app;
