const mongoose = require('mongoose');
const CBCT_OPG_Schema = new mongoose.Schema({
    centerName: {
        type: String,
        required: [true, 'Center name is required'],
        trim: true,
        lowercase: true,

    },
    ownerName: {
        type: String,
        required: [true, 'Owner name is required'],
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,   
        required: true,
        trim: true,     
        lowercase: true,
        match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, 'Please enter a valid email address'],
        unique: [true, 'Email already exists']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        match: /^\d{10}$/, message: 'Please enter a valid 10-digit phone number',
        
    },
    alternatePhoneNumber: {
        type: String,
        trim: true,
       match: [/^\d{10}$/, 'Please enter a valid 10-digit alternate phone number']

    },
   website_url: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*(\?.*)?$/, 'Please enter a valid website URL']
},
 
})
const CBCT_OPG_Model = mongoose.model('CBCT_OPG', CBCT_OPG_Schema);

module.exports = CBCT_OPG_Model;