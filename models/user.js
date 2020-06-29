const mongoose = require('mongoose');
const { modelName } = require('./dishes');
var Schema = mongoose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true,
    },
    admin: {
        type:Boolean,
        default:false
    }

});
module.exports = mongoose.model('userModel',User);