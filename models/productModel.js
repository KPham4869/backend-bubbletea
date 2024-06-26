
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  ID_Product: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  Description: { type: String },
  Price: { type: Number, required: true },
  Image: {type: String}
});

module.exports = mongoose.model('Product', ProductSchema);
