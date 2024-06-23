const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const Product = require('../models/productModel'); // Import Product model

router.get('/getProducts/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }) || await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', productController.addProduct);
router.get('/', productController.getAllProducts);
module.exports = router;
