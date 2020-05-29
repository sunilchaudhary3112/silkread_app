// Mongo command
// ".\mongod.exe" --dbpath= "D:\MyApps_Git\mongo\data\db\"
// to connect from ide -- localhost:27017

// user sunil password -- Super123
// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://sunil:<password>@cluster0-h3mdq.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
// For App - use this url
// mongodb+srv://sunil:Super123@cluster0-h3mdq.mongodb.net/silkread_db?retryWrites=true&w=majority

// For IDE use this-url 
// mongodb+srv://sunil:Super123@cluster0-h3mdq.mongodb.net/silkread_db

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Import routes for "catalog" area of site
var catalogRouter = require('./routes/catalog'); 

var app = express();
//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://sunil:Super123@cluster0-h3mdq.mongodb.net/silkread_db?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

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
