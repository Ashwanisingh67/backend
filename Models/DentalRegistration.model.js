const mongoose=require('mongoose');
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
 file:{
    type: String,
    required: [true, 'Image is required'],
    trim: true
 },
 qualification: {
   type: String,
   required: [true, 'Qualification is required'],
   trim: true
 },
 appointments:[
     {
         type:mongoose.Schema.Types.ObjectId,
         ref:"Appointment"
     }
 ]
 });

const DentalRegistration = mongoose.model('DentalRegistration', dentalRegistrationSchema);
module.exports = DentalRegistration; 