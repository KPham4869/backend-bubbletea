const Product = require('../models/productModel');
const Counter = require('../middlewares/counterMiddlewares'); // Import counter model
const path = require('path');

const getAllProducts = async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};
const addProduct = async (req, res) => {
  try {
    const { name, description, price, imageName } = req.body;
    const imagePath = path.join(__dirname, '../images', imageName);

    const counter = await Counter.findOneAndUpdate(
      { name: 'productId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const newProduct = new Product({
      id: counter.seq, 
      name,
      description,
      price,
      imageUrl: imagePath
    });

    await newProduct.save();

    res.status(201).json({message: 'Thêm sản phẩm thành công', newProduct}); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllProducts,
  addProduct
};
