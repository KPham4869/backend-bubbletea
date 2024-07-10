
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  ID_Order: { type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId(), unique: true },
  TotalAmount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
