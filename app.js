  // sudo npm install -g express-generator 

/* 
app.use() confusion:-

app.use() allows us to mount a middleware function(s) to a specific path, for ex:
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
        as it can be seen path is not mentioned in this function. 
        so what that means is that these function will be for every path that exists in the
        application
app.use('/', indexRouter);
app.use('/users', usersRouter);
        in the above examples, path is mentioned. so the functions that are
        mentioned after path will be performed only at that path
   ***********************      ***************************       ************************
   
the next() function:-
router.get('/',(req,res,next)=> {
  if(req.body.name==='sarthak){
    console.log('hello');
  }else{
    next();
  }
})

*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var authenticate = require('./authenticate')

const mongoose = require('mongoose');
//const Dishes = require('./models/dishes');  // this is actually not required(tested)

const url = 'mongodb://localhost:27017/conFusion';  // this url is for mongoDb server
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
// express server runs at http://localhost:3000

const connect = mongoose.connect(url,options);  // options are to remove depreciated warnings

// connnect gives a promise so handle in next line
connect.then((db) => {
  console.log('connection successful!');
}, (err)=> {
  console.log(err);
});

var app = express(); // app is an instance of express class
// i.e using this we can access all methods of express class

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  // meaning?
//app.use(cookieParser('12345-67890-09876-54321'));
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new fileStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter); 
app.use('/users', usersRouter);

// setting up authentication
function auth (req, res, next) {
  console.log(req.user)
  if (!req.user) {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        return next(err);
  } else {
          next();
  }
}

app.use(auth);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);
app.use('/dishes', dishRouter);

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
