
const OrderDetail = require('../models/orderDetailModel');


const createOrderDetail = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid products data' });
    }
    const orderDetails = await OrderDetail.insertMany(products);
    res.status(201).json(orderDetails);
  } catch (error) {
    console.error('Error creating order details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createOrderDetail };
