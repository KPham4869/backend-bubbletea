const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ID_OrderDetail: { type: Number, required: true, unique: true },
  ID_Order: { type: Number, required: true, ref: 'Order' },
  ID_BubbleTea: { type: Number, required: true, ref: 'Product' },
  Quantity: { type: Number, required: true }
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
