const  patientModel = require('../Models/patientModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');   

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all the required fields' });
    }

    // Find user by email
    const user = await  patientModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id },"tarzen", { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true, 
      maxAge: 3600000 // 1 hour
    });

    res.status(200).json({ message: 'Login successful', token, data: user });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = userLogin;