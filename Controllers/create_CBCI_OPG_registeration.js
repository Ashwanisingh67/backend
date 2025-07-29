const sendmail = require('../helper/sendMail');
const CBCT_OPG_Model = require('../Models/CBCT_OPG_Model');
const CBCI_OPG_registeration = async (req, res) => {
  try {
    const { centerName, OwnerName, email, phoneNumber, alternatePhoneNumber, websiteURL } = req.body;

    // Validate required fields
    if (!centerName || !OwnerName || !email || !phoneNumber || !websiteURL) {
      return res.status(400).json({ message: 'Please fill all the required fields' ,success:false});
    }

    // Create a new CBCT_OPG document
    const newCBCT_OPG = new CBCT_OPG_Model({
      centerName,
      OwnerName,
      email,
      phoneNumber,
      alternatePhoneNumber,
      websiteURL
    });

    // Save the document to the database
    await newCBCT_OPG.save();
    sendmail({centerName,OwnerName,email,phoneNumber,Registration:"CBCT & OPG"});

    res.status(201).json({ message: 'CBCT OPG registration successful',success:true, data: newCBCT_OPG });
  } catch (error) {
    console.error('Error during CBCT OPG registration:', error);
    res.status(500).json({ message: 'Internal server error',success:false });
  }
}

module.exports = CBCI_OPG_registeration
