const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  ID_Category: { type: Number, required: true, unique: true },
  Size: { type: Number, required: true }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
