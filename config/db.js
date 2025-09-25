const mongoose = require('mongoose');
const database=async (req,res) => {
  try {
    await mongoose.connect("mongodb+srv://A85308660:Ox1D4Xla6z1N3hkr@dentalclinic.oolb9je.mongodb.net/dentaltourismclinicsindia")
      console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
}

module.exports = database;