const DentalRegistration = require("../Models/DentalRegistration_model");
const cloudinary = require("../config/Cloudinary");
const getDataUri = require("../config/datauri");

const dentalRegistration = async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phoneNumber, 
      state, 
      qualification,
      ClinicName,        
      ClinicPhoneNumber, 
      ClinicAddress,    
      ClinicInstagram,   
      ClinicWebsite,    
      ClinicYoutube      
    } = req.body;

    // Check for required fields
    if (!name || !email || !phoneNumber || !state || !qualification) {
      return res.status(400).json({ 
        message: "Name, email, phone number, state, and qualification are required",
        success: false 
      });
    }

    // Check if main file was uploaded (required)
    if (!req.files || !req.files.file) {
      return res.status(400).json({ 
        message: "Personal document file is required",
        success: false 
      });
    }

    const file = req.files.file[0];
    let clinicFileResponse = null;

    // Validate main file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({ 
        message: "Only JPEG, PNG, or PDF files are allowed for personal document",
        success: false 
      });
    }

    if (file.size > maxSize) {
      return res.status(400).json({ 
        message: "Personal document file size must be less than 5MB",
        success: false 
      });
    }

    // Process main file upload
    const fileResponse = await uploadToCloudinary(file);

    // Process clinic file if provided
    if (req.files.ClinicFile) {
      const clinicFile = req.files.ClinicFile[0];
      
      if (!allowedTypes.includes(clinicFile.mimetype)) {
        return res.status(400).json({ 
          message: "Only JPEG, PNG, or PDF files are allowed for clinic document",
          success: false 
        });
      }

      if (clinicFile.size > maxSize) {
        return res.status(400).json({ 
          message: "Clinic document file size must be less than 5MB",
          success: false 
        });
      }

      clinicFileResponse = await uploadToCloudinary(clinicFile);
    }

    // Create new registration
    const newRegistration = new DentalRegistration({
      name,
      email,
      phoneNumber,
      state,
      file: fileResponse.secure_url,
      qualification,
      ClinicName,
      ClinicPhoneNumber,
      ClinicAddress,
      ClinicFile: clinicFileResponse ? clinicFileResponse.secure_url : undefined,
      ClinicInstagram,
      ClinicWebsite,
      ClinicYoutube
    });

    await newRegistration.save();

    return res.status(201).json({
      message: "Dental registration created successfully",
      DentalRegistration: newRegistration,
      success: true
    });

  } catch (error) {
    console.error("Error creating dental registration:", error);
    return res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success: false 
    });
  }
};

async function uploadToCloudinary(file) {
  try {
    const fileUri = getDataUri(file);
    return await cloudinary.uploader.upload(fileUri.content, {
      resource_type: 'auto',
      folder: 'dental_registrations',
      quality: 'auto:good',
      fetch_format: 'auto'
    });
  } catch (uploadError) {
    console.error("Cloudinary upload error:", uploadError);
    throw new Error("Failed to upload file to Cloudinary");
  }
}

module.exports = dentalRegistration;