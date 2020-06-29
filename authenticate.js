var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('./models/user');

// authenticate(),serializeUser() and deserializeUser() are already writtrn in user schema by passport-local-mongoose
exports.local = passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());