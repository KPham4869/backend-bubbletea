const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

router.post('/', orderDetailController.createOrderDetail);

module.exports = router;
