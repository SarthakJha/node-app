var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var passport = require('passport');

var User = require('./../models/user');
const session = require('express-session');
const authenticate = require('./../authenticate');

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// signing-up users
router.post('/signup',(req,res,next)=>{
// using passport authenticate method
User.register(new User({username: req.body.username}),req.body.password,(err,user)=>{
  if(err){
    res.setHeader('Content-Type','application/json');
    res.status(500).json({
      err: err
    })
  } else {
    passport.authenticate('local') (req,res,() =>{
      res.setHeader('Content-Type','application/json');
      res.status(200).json({
        success: true,
        status: "regesteration successful!"
      });
    });
  }
});
});

// here a second middleware function is used i.e passport.authenticate('local')
// if this middleware fails, error response will be automatically sent back
// therefore, we dont need to pass next(err)
router.post('/login',passport.authenticate('local'),(req,res)=> {
  var token = authenticate.getToken({_id: req.user._id});
  res.setHeader('Content-Type','application/json');
  res.status(200).json({
    success: true,
    token: token,
    status: "log-in successful!"
  });
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
