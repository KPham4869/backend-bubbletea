// src/models/orderDetail.js
const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ID_Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  Quantity: { type: Number, required: true },
});
orderDetailSchema.add({ _id: mongoose.Schema.Types.ObjectId });
const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
