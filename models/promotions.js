const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
require('mongoose-currency').loadType(mongoose);

const Currency = mongoose.Types.Currency;

const promSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    image: {
        type: String,
        required: true
    },
    label: {
        type: String,

    },
    price: {
        type: Currency,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
});

var promotion = mongoose.model('Prom',promSchema);

module.exports = promotion;