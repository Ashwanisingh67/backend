const mongoose = require('mongoose');
const database=async (req,res) => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
      console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = database;
