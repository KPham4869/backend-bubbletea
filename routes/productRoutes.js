const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Định nghĩa route tạo sản phẩm mới
router.post('/', productController.createProduct);

module.exports = router;
