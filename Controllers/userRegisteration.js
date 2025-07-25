const userModel = require('../Models/userModel');
const bcrypt = require('bcrypt');
const userRegistration = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new userModel({
      name,
      phone,
      email,
      password: hashedPassword
    });

    // Save the document to the database
    await newUser.save();
    
    res.status(201).json({ message: 'User registration successful', data: newUser });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = userRegistration;