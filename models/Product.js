const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required']
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Product category is required']
    },
    stock: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Product', productSchema);
