const otpService = require('../services/otpService');
const TempUser = require('../models/tempUserModel');
const User = require('../models/userModel');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    await otpService.sendMailWithOTP(email);
    res.status(200).json({ message: 'OTP sent successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otpToken } = req.body;

  try {
      const tempUser = await TempUser.findOne({ email });
      if (!tempUser) {
          return res.status(400).json({ message: 'Invalid OTP or email' });
      }

      if (tempUser.otpToken !== otpToken) {
          return res.status(400).json({ message: 'Invalid OTP' });
      }

      const newUser = new User({
          username: tempUser.username,
          email: tempUser.email,
          password: tempUser.password
      });

      const savedUser = await newUser.save();
      await TempUser.findByIdAndDelete(tempUser._id); 

      res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (err) {
      res.status(500).json({ message: 'Error verifying OTP', error: err.message });
  }
};