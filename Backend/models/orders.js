const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const OrderSchema = new Schema({
    OrderedItemName: {
        type: String,
        required: true
    },
    OrderedItemQuantity: {
        type: Number,
        required: true
    },
    OrderedVendorName: {
        type: String,
        required: true
    },
    OrderedItemPrice: {
        type: Number,
        required: true
    },
    OrderedStatus: {
        type: String,
        required: true
    },
    OrderedCustomer: {
        type: String,
        required: true
    }
});
module.exports = orders = mongoose.model('orders', OrderSchema);