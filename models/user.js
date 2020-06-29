// ** when using passport, password field is not required by the schema

const mongoose = require('mongoose');
const { modelName } = require('./dishes');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    admin: {
        type:Boolean,
        default:false
    }

});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('userModel',User);