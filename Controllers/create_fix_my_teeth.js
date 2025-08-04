const FixMyTeeth = require('../Models/Fix_my_teeth');
const cloudinary = require("../config/Cloudinary");
const getDataUri = require("../config/datauri");

const createFixMyTeeth = async (req, res) => {
  try {
    let { name, email, selectedProblems, selectedState, otherProblemText, photoUrls } = req.body;

    // Parse selectedProblems if needed
    if (selectedProblems && typeof selectedProblems === 'string') {
      try {
        selectedProblems = JSON.parse(selectedProblems);
      } catch (err) {
        // ignore or handle
      }
    }

    // Default values
    if (!Array.isArray(selectedProblems)) selectedProblems = selectedProblems ? [selectedProblems] : [];
    if (!otherProblemText) otherProblemText = "";

    // Normalize photoUrls
    let uploadedPhotoUrls = [];
    if (photoUrls) {
      // If photoUrls is a JSON-string, parse it
      if (typeof photoUrls === 'string') {
        try { uploadedPhotoUrls = JSON.parse(photoUrls); }
        catch (err) { uploadedPhotoUrls = []; }
      } else if (Array.isArray(photoUrls)) {
        uploadedPhotoUrls = photoUrls;
      }
    }

    // Handle files (uploads to Cloudinary)
    const photoFiles = req.files && req.files.photo
      ? (Array.isArray(req.files.photo) ? req.files.photo : [req.files.photo])
      : [];

    for (const file of photoFiles) {
      const fileuri = getDataUri(file); // Should return { content: ... }
      const cloudResponse = await cloudinary.uploader.upload(fileuri.content);
      uploadedPhotoUrls.push(cloudResponse.secure_url);
    }

    // Validate required fields
    if (!name || !email || !selectedProblems.length || !selectedState) {
      return res.status(400).json({ message: 'Please fill all required fields', success: false });
    }

    // Create a new Fix My Teeth document
    const newFixMyTeeth = new FixMyTeeth({
      name,
      email,
      selectedProblems,
      selectedState,
      otherProblemText,
      photoUrls: uploadedPhotoUrls
    });

    // Save the document to the database
    await newFixMyTeeth.save();

    res.status(201).json({ message: 'Fix My Teeth submission successful', data: newFixMyTeeth, success: true });
  } catch (error) {
    console.error('Error during Fix My Teeth submission:', error);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = createFixMyTeeth;
