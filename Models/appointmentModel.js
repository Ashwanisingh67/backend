// models/appointmentModel.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: {
     type: String,
      required: true, 
      trim: true },
  time: {
     type: String,
      required: true,
       trim: true },
  bookingFor: {
     type: String,
      enum: ["self", "other"],
       required: true },
  bookedBy:[
     { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Patient", required: true }
],
  personName: {
     type: String, 
    required: true, 
    trim: true },
  personEmail: {
     type: String, 
     required: true, 
     match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
  personPhone: {
     type: String, 
     required: true, 
     match: [/^\d{10}$/, "Invalid phone number"] }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
