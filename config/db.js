const mongoose = require('mongoose');
const database=async (req,res) => {
  try {
    await mongoose.connect("mongodb://localhost:27017/clinic")
      console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = database;
