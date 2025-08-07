const FixMyTeeth = require('../Models/Fix_my_teeth');
const cloudinary = require("../config/Cloudinary");
const getDataUri = require("../config/datauri");

const createFixMyTeeth = async (req, res) => {
  try {
    // Debugging logs
    console.log("Request body:", req.body);
    console.log("Request files:", req.files);

    // Initialize variables with proper defaults
    const { 
      name = '', 
      email = '', 
      selectedState = '', 
      otherProblemText = '',
      selectedProblems = '' // Initialize as string
    } = req.body;

    // Process selectedProblems - handle both string and array inputs
    let problemsArray = [];
    if (selectedProblems) {
      try {
        // Try parsing as JSON if it looks like JSON
        if (selectedProblems.startsWith('[') || selectedProblems.startsWith('{')) {
          problemsArray = JSON.parse(selectedProblems);
        } else {
          // Handle comma-separated string
          problemsArray = selectedProblems.split(',').map(p => p.trim());
        }
      } catch (err) {
        // Fallback to single problem
        problemsArray = [selectedProblems];
      }
    }

    // Ensure we have an array
    if (!Array.isArray(problemsArray)) {
      problemsArray = problemsArray ? [problemsArray] : [];
    }

    // Handle file uploads according to your Multer config
    const uploadedPhotoUrls = [];
    
    // Process 'file' field if exists
    if (req.files && req.files.file) {
      const file = Array.isArray(req.files.file) ? req.files.file[0] : req.files.file;
      try {
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        uploadedPhotoUrls.push(cloudResponse.secure_url);
      } catch (uploadError) {
        console.error("Error uploading file to Cloudinary:", uploadError);
      }
    }

    // Process 'ClinicFile' field if exists
    if (req.files && req.files.ClinicFile) {
      const clinicFile = Array.isArray(req.files.ClinicFile) ? req.files.ClinicFile[0] : req.files.ClinicFile;
      try {
        const fileUri = getDataUri(clinicFile);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        uploadedPhotoUrls.push(cloudResponse.secure_url);
      } catch (uploadError) {
        console.error("Error uploading ClinicFile to Cloudinary:", uploadError);
      }
    }

    // Validate required fields
    if (!name || !email || !problemsArray.length || !selectedState) {
      return res.status(400).json({ 
        message: 'Name, email, at least one problem, and state are required', 
        success: false 
      });
    }

    // Create new document
    const newFixMyTeeth = new FixMyTeeth({
      name,
      email,
      selectedProblems: problemsArray,
      selectedState,
      otherProblemText: otherProblemText || "",
      photoUrls: uploadedPhotoUrls
    });

    await newFixMyTeeth.save();

    res.status(201).json({ 
      message: 'Fix My Teeth submission successful', 
      data: newFixMyTeeth, 
      success: true 
    });

  } catch (error) {
    console.error('Error during Fix My Teeth submission:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
      success: false 
    });
  }
};

module.exports = createFixMyTeeth;