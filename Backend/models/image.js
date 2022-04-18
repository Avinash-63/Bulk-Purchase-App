const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating schema
const Image = new Schema({
    img: {
        data: Buffer,
        contentType: String
    }
});

module.exports = Image = mongoose.model('Image', Image);