
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  ID_OrderDetail: { type: Number, required: true, unique: true },
  Quantity: { type: Number, required: true },
  ID_Product: { type: Number, required: true, ref: 'Product' }
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
