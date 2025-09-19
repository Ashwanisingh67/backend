const Clinic = require('../Models/AllClinics');

const getAllClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find({});
    console.log(clinics);
    res.status(200).json({ clinics });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get clinics', error: err.message });
  }
};

module.exports = getAllClinics;
