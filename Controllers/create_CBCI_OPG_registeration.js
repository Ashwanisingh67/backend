const {sendmail} = require('../helper/sendMail');
const CBCT_OPG_Model = require('../Models/CBCT_OPG_Model');
const CBCI_OPG_registeration = async (req, res) => {
  try {
    const { centerName, ownerName, email, phoneNumber, alternatePhoneNumber, website_url } = req.body;

    // Validate required fields
    if (!centerName || !ownerName || !email || !phoneNumber || !website_url) {
      console.log(centerName, ownerName, email, phoneNumber, website_url);
      return res.status(400).json({ message: 'Please fill all the required fields' ,success:false});
    }

    // Create a new CBCT_OPG document
    const newCBCT_OPG = new CBCT_OPG_Model({
      centerName,
      ownerName,
      email,
      phoneNumber,
      alternatePhoneNumber,
      website_url
    });

    console.log(ownerName,"ownername")
    await sendmail({centerName,ownerName,email,phoneNumber,Registration:"CBCT & OPG"});

    // Save the document to the database
    await newCBCT_OPG.save();
   

    res.status(201).json({ message: 'CBCT OPG registration successful',success:true, data: newCBCT_OPG });
  } catch (error) {
    console.error('Error during CBCT OPG registration:', error);
    res.status(500).json({ message: 'Internal server error',success:false });
  }
}

module.exports = CBCI_OPG_registeration
