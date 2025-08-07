const ContactUS= require('../Models/Contact_US');
const createContactUs = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill all the required fields', success: false });
    }

    const newContact = new ContactUS({
      name,
      email,
      message
    });

    
    await newContact.save();

    res.status(201).json({ message: 'Contact Us submission successful', data: newContact, success: true });
  } catch (error) {
    console.error('Error during Contact Us submission:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = createContactUs;
