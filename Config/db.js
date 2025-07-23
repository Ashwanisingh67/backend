const mongoose = require('mongoose');
const database=async (req,res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    res.status(200).send('Database connected successfully');
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = database;
