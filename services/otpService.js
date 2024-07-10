const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const { mail } = require('../mail/mailForm'); 

class OTPService {
  constructor() {
    this.secret = this.getSecret();
  }

  getSecret() {
    const secret = process.env.SECRET_OTP_TOKEN || '';

    if (!secret) {
      throw new Error('SECRET_OTP_TOKEN environment variable is not defined.');
    }

    return secret;
  }

  generateOTPcode() {
    return speakeasy.totp({
      secret: this.secret,
      encoding: 'base32',
      digits: 6,
      step: 60,
    });
  }

  async sendMailWithOTP(email) {
    const token = this.generateOTPcode();
    const subject = 'Mã xác minh';
    const mailForm = mail(token, subject);
    const mailOptions = {
      from: 'Nhóm 4',
      to: email,
      subject,
      html: mailForm,
    };

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      const info = await transporter.sendMail(mailOptions);

      return token; 
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email.', error);
      
    }
  }
}

module.exports = new OTPService();
