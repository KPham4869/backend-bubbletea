const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: { type: String, required: true },
  description: {type: String},
  price: { type: Number, required: true },
  imageUrl: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
