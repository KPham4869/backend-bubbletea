const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const OTPService = require('../services/otpService');
const TempUser = require('../models/tempUserModel'); // Mô hình tạm thời cho người dùng chưa xác nhận OTP

const register = async (req, res) => {
    const { username, email, password, resPassword } = req.body;

    if (password !== resPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        
        const otpToken = await OTPService.sendMailWithOTP(email);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTempUser = new TempUser({ 
            username,
            email,
            password: hashedPassword,
            otpToken
        });

        const savedTempUser = await newTempUser.save();
        res.status(201).json({ message: 'OTP sent to email. Please verify.', tempUser: savedTempUser });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};

const verifyOTP = async (req, res) => {
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


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const secretKey = process.env.JWT_SECRET || 'default_secret_key'; // Default fallback
        console.log('JWT_SECRET:', process.env.JWT_SECRET); // Debug log

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};


const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword, resNewPassword } = req.body;

    if (newPassword !== resNewPassword) {
        return res.status(400).json({ message: 'New passwords do not match' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating password', error: err.message });
    }
};
const getUser = async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {
    register,
    verifyOTP,
    login,
    changePassword,
    getUser
};
