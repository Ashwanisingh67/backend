require('dotenv').config();

module.exports = {
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing',
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET ? 'Loaded' : 'Missing',
  CURRENCY: 'INR',
  DENTAL_SERVICES: {
    BASIC_CLEANING: 399,
    FILLING: 999,
    ROOT_CANAL: 1499
  }
};