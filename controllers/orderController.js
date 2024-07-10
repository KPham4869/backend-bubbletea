const Order = require('../models/OrderModel');
const OrderDetail = require('../models/orderDetailModel'); 

exports.createOrder = async (req, res) => {
  const { TotalAmount, ID_OrderDetail } = req.body;

  try {
    const newOrder = new Order({
      TotalAmount,
    });
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
