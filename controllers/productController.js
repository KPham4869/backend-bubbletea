const Product = require('../models/Product');

const createProduct = async (req, res) => {
    const { name, price, description, category, stock } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!name || !price || !category) {
        return res.status(400).json({
            message: 'name, price, and category are required'
        });
    }

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            category,
            stock
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    createProduct
};
