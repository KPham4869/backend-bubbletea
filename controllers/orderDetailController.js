const mongoose = require('mongoose');
const OrderDetail = require('../models/orderDetailModel');

const createOrderDetail = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid products data' });
    }

    const validProducts = products.map(product => {
      if (product.ID_Product && mongoose.Types.ObjectId.isValid(product.ID_Product) && product.Quantity) {
        return {
          ...product,
          ID_OrderDetail: new mongoose.Types.ObjectId() 
        };
      }
      return null;
    }).filter(product => product !== null);

    if (validProducts.length !== products.length) {
      return res.status(400).json({ message: 'Invalid product data format' });
    }

    const orderDetails = await OrderDetail.insertMany(validProducts);
    res.status(201).json(orderDetails);
  } catch (error) {
    console.error('Error creating order details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createOrderDetail };
