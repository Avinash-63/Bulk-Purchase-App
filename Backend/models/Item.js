const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const ItemSchema = new Schema({
    VendorName: {
        type: String,
        required: true
    },
    ItemName: {
        type: String,
        required: true
    },
    ItemQuantity: {
        type: Number,
        required: true
    },
    ItemPrice: {
        type: Number,
        required: true
    },
    IsDispatched: {
        type: Number,
        required: true
    }
});

module.exports = Item = mongoose.model('Item', ItemSchema);