const mongoose = require('mongoose');
require('dotenv').config();
const database=async (req,res) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/dentalclinic'|| process.env.MONGO_URL)
      console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = database;
