
const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
  ID_OrderDetail: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
  ID_Product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  Quantity: { type: Number, required: true },
},{ timestamps: true });

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
