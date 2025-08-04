

const FixMyTeeth = require('../Models/Fix_my_teeth');

const getAllFixMyTeethSubmissions = async (req, res) => {
  try {
    // Fetch all submissions, sorted newest first
    const submissions = await FixMyTeeth.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = getAllFixMyTeethSubmissions;
