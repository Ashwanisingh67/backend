const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
  Clinic: String,
  State: String,
  CITY: String,
  PHONE_NO: String,
  WEBSITE: String,
  EMAIL_ID: String
});


module.exports = mongoose.model('Clinics', clinicSchema);
