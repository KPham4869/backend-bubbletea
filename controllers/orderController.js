// const Order = require('../models/orderModel');
// const OrderDetail = require('../models/orderDetailModel');
// const Product = require('../models/productModel');

// const createOrder = async (req, res) => {
//     try {
//         const { ID_User, items } = req.body; // items: [{ ID_Product, Quantity }]
//         let totalAmount = 0;
//         const orderItems = [];

//         for (const item of items) {
//             const product = await Product.findOne({ ID_Product: item.ID_Product });
//             if (!product) {
//                 return res.status(404).json({ error: 'Product not found' });
//             }

//             const itemTotal = product.price * item.Quantity;
//             totalAmount += itemTotal;

//             orderItems.push({
//                 name: product.name,
//                 price: product.price,
//                 quantity: item.Quantity
//             });
//         }

//         const newOrder = new Order({
//             ID_Order: new Date().getTime(),  // or another unique ID generator
//             ID_User,
//             TotalAmount: totalAmount,
//             items: orderItems
//         });

//         await newOrder.save();

//         for (const item of items) {
//             const product = await Product.findOne({ ID_Product: item.ID_Product });

//             const newOrderDetail = new OrderDetail({
//                 ID_OrderDetail: new Date().getTime(),  // or another unique ID generator
//                 ID_Order: newOrder._id,
//                 ID_Product: product._id,
//                 Quantity: item.Quantity
//             });

//             await newOrderDetail.save();
//         }

//         res.status(201).json(newOrder);
//     } catch (error) {
//         res.status(500).json({ error: 'Error creating order' });
//     }
// };
// module.exports = {
//     createOrder
// }