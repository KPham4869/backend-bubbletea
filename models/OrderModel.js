const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    ID_Order: { type: Number, required: true, unique: true },
    ID_User: { type: Number, required: true, ref: 'User' },
    TotalAmount: { type: Number, required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
