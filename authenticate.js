var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var User = require('./models/user');
var config = require('./config');
// authenticate(),serializeUser() and deserializeUser() are already writtrn in user schema by passport-local-mongoose
exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,
        {expiresIn: "10h"});
};

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
// put in <authorisation> header with value bearer <token> 
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts,
    (jwtPayload, done)=> {
        console.log("JWT payload: ",jwtPayload);
        User.findOne({_id: jwtPayload._id}, (err,user)=>{
            if(err){
                return done(err)
            } else if(user) {
                done(null,user);
            }else {
                done(null,false);
            }
            
        });
    }));

    exports.veriftUser = passport.authenticate('jwt',{session: false});