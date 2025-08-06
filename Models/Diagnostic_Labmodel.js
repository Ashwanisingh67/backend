const mongoose = require('mongoose');
const diagnosticLabSchema = new mongoose.Schema({
    labName: {
        type: String,
        required: [true, 'Lab name is required'],
    },
   OwnerName:{
    type:String,
    required: [true, 'Owner name is required']

   },
   email:{
       type:String,
       required: [true, 'Email is required'],
       match: [/.+\@.+\..+/, 'Please enter a valid email address'],
       unique: [true, 'Email already exists']
   },
   phoneNumber: {
       type: String,
       required: [true, 'Phone number is required'],
       match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number']
   },
   alternativeNumber: {
       type: String,
       match: [/^\d{10}$/, 'Please enter a valid 10-digit alternative number']
   },
   websiteURL: {
       type: String,
         required: [true, 'Website URL is required'],
         match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/, 'Please enter a valid URL']
   },
   appointments:[
       {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Appointment"
       }
   ]
});
const DiagnosticLab = mongoose.model('DiagnosticLab', diagnosticLabSchema);
module.exports = DiagnosticLab;
