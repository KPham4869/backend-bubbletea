// const OrderDetail = require('../models/orderDetailModel')
// const Order = require('../models/orderModel');
// const Product = require('../models/productModel');

// exports.createOrderDetail = async (req, res) => {
//   try {
//     const { ID_Order, ID_Product, Quantity } = req.body;

//     // Tìm Order bằng ID_Order
//     const order = await Order.findOne({ ID_Order });
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     // Tìm Product bằng ID_Product
//     const product = await Product.findOne({ ID_Product });
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     const newOrderDetail = new OrderDetail({
//       ID_OrderDetail: new Date().getTime(),  // Hoặc một cách khác để tạo ID_OrderDetail duy nhất
//       ID_Order: order._id,
//       ID_Product: product._id,
//       Quantity
//     });

//     await newOrderDetail.save();

//     res.status(201).json(newOrderDetail);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating order detail' });
//   }
// };
