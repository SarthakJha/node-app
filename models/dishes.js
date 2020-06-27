const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // implementing mongoose currency
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,     // check line 4
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema] //array of type comment schema
},{
    timestamps: true //this will add createdAt and updatedAt timestamps for every document of the schema
});

// creating model Dishes
var Dishes = mongoose.model('Dish',dishSchema); // mongoose will automatically into plural('Dish'->'Dishes')

module.exports = Dishes;