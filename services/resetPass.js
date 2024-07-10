const User = require('../models/User');
const emailService = require('../services/emailService');

exports.resetPassword = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error('User not found');
  }

  const newPassword = await user.resetPassword();
  await emailService.sendPasswordResetEmail(email, newPassword);
  return newPassword;
};
