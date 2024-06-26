const Product = require('../models/productModel');
const path = require('path');


const createProduct = async (req, res) => {
  try {
    const { ID_Product, Name, Description, Price, Image } = req.body;
    const imagePath = path.join(__dirname, '../assets/images', Image);
    const newProduct = new Product(
      { ID_Product, 
        Name, 
        Description, 
        Price,
        Image: imagePath
       });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getProductImage = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ Image: product.Image }); // Trả về chuỗi base64 của ảnh
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateProduct= async (req, res) => {
  try {
    const { id } = req.params;
    const { Quantity } = req.body;

    const updatedProduct = await Product.findOneAndUpdate(
      { ID_Product: id },
      { Quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findOneAndDelete({ ID_Product: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProduct,
  getProductImage,
  updateProduct,
  deleteProduct,
  getAllProducts
};
