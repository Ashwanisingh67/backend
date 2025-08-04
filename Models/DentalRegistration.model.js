const mongoose = require('mongoose');

const dentalRegistrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {   
    type: String,
    required: [true, 'Email is required'],
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    unique: [true, 'Email already exists'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  file: {
    type: String,
    required: [true, 'Image is required'],
    trim: true
  },
  qualification: {
    type: String,
    required: [true, 'Qualification is required'],
    trim: true
  },
  ClinicName: {
    type: String,
    trim: true
  },  
  ClinicPhoneNumber: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
  },
  ClinicAddress: { 
    type: String,
    trim: true
  },
  ClinicFile: {
    type: String,
    trim: true
  },
  ClinicInstagram: {
    type: String,
     match: [
    /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
    'Please enter a valid URL (e.g., http://example.com or example.com)'
  ],
    trim: true
  },
  ClinicWebsite: {
    type: String,
     match: [
    /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
    'Please enter a valid URL (e.g., http://example.com or example.com)'
  ],
    trim: true
  },
  ClinicYoutube: {
    type: String,
    match: [
    /^(https?:\/\/)?(www\.)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
    'Please enter a valid URL (e.g., http://example.com or example.com)'
  ],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment"
  }]
});

const DentalRegistration = mongoose.model('DentalRegistration', dentalRegistrationSchema);
module.exports = DentalRegistration;