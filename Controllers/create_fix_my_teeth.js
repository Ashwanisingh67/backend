const FixMyTeeth = require('../Models/Fix_my_teeth');
const cloudinary = require("../config/Cloudinary");
const getDataUri = require("../config/datauri");

const createFixMyTeeth = async (req, res) => {
  try {

    // Initialize variables with proper defaults
    const { 
      name = '', 
      email = '', 
      selectedState = '', 
      otherProblemText = '',
      selectedProblems = '',
        photo
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

    // Normalize photoUrls if sent in request body
    let uploadedPhotoUrls = [];
    if (photo) {
      if (typeof photo === 'string') {
        try {
          uploadedPhotoUrls = JSON.parse(photo);
        } catch (err) {
          uploadedPhotoUrls = [];
        }
      } else if (Array.isArray(photo)) {
        uploadedPhotoUrls = photo;
      }
    }


    // Process uploaded files in req.files (from multer .array('photo'))
    const photoFiles = Array.isArray(req.files) ? req.files : [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of photoFiles) {
      // Validate file type
      if (!allowedTypes.includes(file.mimetype)) {
        return res.status(400).json({
          message: `Only JPEG and PNG files are allowed. Invalid file type: ${file.mimetype}`,
          success: false
        });
      }

      // Validate file size
      if (file.size > maxSize) {
        return res.status(400).json({
          message: "File size must be less than 5MB",
          success: false
        });
      }

      // Upload to Cloudinary
      const fileuri = getDataUri(file); // { content: ... }
      try {
        const cloudResponse = await cloudinary.uploader.upload(fileuri.content, {
          folder: 'fix_my_teeth',
          resource_type: 'image',
          quality: 'auto:good',
          fetch_format: 'auto'
        });
        uploadedPhotoUrls.push(cloudResponse.secure_url);
      } catch (uploadError) {
        console.log('Cloudinary upload failed:', uploadError);
        
        return res.status(500).json({
          
          message: 'Error uploading one of the images. Please try again.',
          success: false
        });
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
      otherProblemText,
      photo: uploadedPhotoUrls
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