const {sendmail} = require("../helper/sendMail");
const PharmaBrand = require("../Models/PharmaBrand.model");
const createPharmaBrand = async (req, res) => {
  try {
    const {
      brandName,
      OwnerName,
      email,
      phoneNumber,
      alternativeNumber,
      websiteURL,
    } = req.body;

    if (!brandName || !OwnerName || !email || !phoneNumber) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const newBrand = new PharmaBrand({
      brandName,
      OwnerName,
      email,
      phoneNumber,
      alternativeNumber,
      websiteURL,
    });

    await  sendmail({OwnerName,email,phoneNumber,brandName,Registration:"Pharma Brand"});
    await newBrand.save();
   
    return res
      .status(201)
      .json({
        message: "Pharma brand created successfully",
        brand: newBrand,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Internal server error",
        error: error.message,
        success: false,
      });
  }
};
module.exports = createPharmaBrand;
