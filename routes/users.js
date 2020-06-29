var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var userModel = require('./../models/user');
const session = require('express-session');
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// signing-up users
router.post('/signUp',(req,res,next)=>{
  userModel.findOne({username: req.body.username})
  .then((user)=>{  // call will return the user(if it exists) else null
      if(user!=null){ // handling case where user already exists
        var error = new Error('the username, '+req.body.username+', already exists');
        error.status = 403;
        next(error);
      } else {
        return userModel.create({
          username: req.body.username,
          password: req.body.password
        });
      }
  })
  .then((user)=> {
    res.setHeader('Content-Type','application/json');
    var jsonObj = {
      status:"Registeration successful",
      user: user
    }
    res.status(200).json(jsonObj);
  }).catch((err)=>next(err));
});

router.post('/login',(req,res,next)=> {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');              
        err.status = 401;
        next(err);
        return;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    userModel.findOne({username: username })
    .then((user)=>{
      if(user!==null) {
        // === checks value as well as data type. == checks only value
      if (username === user.username && password === user.password) {
        req.session.user = 'authenticated';
        res.setHeader('Content-Type','application/json');
        res.status(200).json({
          status: 'authentication successful'
        });  // authorized
      } else {
          var err = new Error('wrong credentials, check agian!');
          res.setHeader('WWW-Authenticate', 'Basic');              
          err.status = 401;
          next(err);
      }
    } else {
      var err = new Error('user, '+username+' ,doesnt exist');
          res.setHeader('WWW-Authenticate', 'Basic');              
          err.status = 401;
          next(err);
    }
    }).catch((err)=> next(err));
  } else {
    res.setHeader('Content-Type','application/json');
    res.status(200).json({
      status: 'already logged in'
    });
  }
});

router.get('/logout',(req,res,next)=> {
  if(req.session){
    req.session.destroy(); //destroys the session
    res.clearCookie('session-id'); // clear the cookies
    res.redirect('/'); // redirect to different page
  } else {
    var error = new Error('you are not logged in');
    error.status = 403;
    next(err);
  }
});


module.exports = router;
