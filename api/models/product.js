// Defines, how a product should look like in application => for mongoose

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    name: String, 
    price: Number
});

module.exports = mongoose.model('Product', productSchema);