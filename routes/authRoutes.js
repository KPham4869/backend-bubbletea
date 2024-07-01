const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/verify-otp', authController.verifyOTP); 
router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);
router.get('/', authController.getUser);

module.exports = router;
