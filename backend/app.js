var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/api/users');
var organizationRouter = require('./routes/api/organization');
var departmentRouter = require('./routes/api/department');
var mongoose = require('mongoose');
var config = require("config");
var postRouter = require('./routes/api/posts');
var FeedbackRouter = require('./routes/api/feedback');
var CandidateRouter = require('./routes/api/candidate');
var EventRouter = require('./routes/api/Event');

var AdminRouter = require('./routes/api/admin')
var app = express();


app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json())
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin',AdminRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/department',departmentRouter);
app.use('/organization', organizationRouter);
app.use('/posts',postRouter);
app.use('/feedback',FeedbackRouter);
app.use('/candidate',CandidateRouter);
app.use('/Event',EventRouter);




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
mongoose
      .connect(config.get("db"),
      {
        useNewUrlParser: true,
        useUnifiedTopology : true,
      })
      .then(()=> console.log("connected successfully!!"))
      .catch((error)=> console.log(error.message));


module.exports = app;
