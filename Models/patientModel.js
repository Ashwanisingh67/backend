const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: {
    type: String,
        required: [true, 'Center name is required'],
        trim: true,
        lowercase: true,
    },
    phone: {
      type: String,
        required: true,
        trim: true,
        match: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number',
    },
    email: {
        type: String,   
        required: true,
        trim: true,     
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address'],
        unique: true, // Ensure email is unique
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    CBCT_OPG_appointments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CBCT_OPG"
        }
    ],
    dentalClinic_appointments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"DentalRegistration"
        }
    ],
    diagnostic_appointments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"DiagnosticLab"
        }
    ]
     
}, { timestamps: true })
const patientModule = mongoose.model('Patient', patientSchema);
module.exports = patientModule;
