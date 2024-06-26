
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  ID_Order: { type: Number, required: true, unique: true },
  ID_OrderDetail: { type: Number, required: true, ref: 'OrderDetail' },
  TotalAmount: { type: Number, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);
