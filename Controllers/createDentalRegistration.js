const DentalRegistration = require("../Models/DentalRegistration.model");
const cloudinary = require("../config/Cloudinary");
const getDataUri = require("../config/datauri");
const dentalRegistrationSchema = async (req, res) => {
  try {
    const { name, email, phoneNumber, state, qualification } = req.body;
    const file = req.file;
    const fileuri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileuri.content);

    // Validate the request body
    if (!name || !email || !phoneNumber || !state || !file || !qualification) {
      return res.status(400).json({ message: "All fields are required",success:false });
    }

    // Create a new dental registration
    const newRegistration = new DentalRegistration({
      name,
      email,
      phoneNumber,
      state,
      file: cloudResponse.secure_url,
      qualification,
    });

    // Save the registration to the database
    await newRegistration.save();

    return res
      .status(201)
      .json({
        message: "Dental registration created successfully",
        DentalRegistration: newRegistration,
        success: true
      });
  } catch (error) {
    console.error("Error creating dental registration:", error);
    return res.status(500).json({ message: "Internal server error",success:false });
  }
};
module.exports = dentalRegistrationSchema;
