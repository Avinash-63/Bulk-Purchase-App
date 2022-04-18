const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const Rating = new Schema({
    OrderedItemName: {
        type: String,
        required: true
    },
    OrderedVendorName: {
        type: String,
        required: true
    },
    OrderedCustomer: {
        type: String,
        required: true
    },
    Rating: {
        type: Number,
        required: true
    }
});
module.exports = rate = mongoose.model('rate', Rating);