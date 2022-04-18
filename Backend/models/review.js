const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const Review = new Schema({
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
    },
    Review: {
        type: String,
        required: true
    }
});
module.exports = review = mongoose.model('review', Review);