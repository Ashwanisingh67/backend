// models/appointmentModel.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  date: { type: String, required: true, trim: true },            // ISO string or yyyy-mm-dd
  time: { type: String, required: true, trim: true },            // e.g. "10:30 AM" or "10:30"
  bookingFor: { type: String, enum: ["self", "other"], default: "self" },

  // Stored patient details (always saved, so other bookings show patient info)
  personName: { type: String, required: true },
  personEmail: { type: String, required: true },
  personPhone: { type: String, required: true },

  // The user who created the booking
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },

  // Exactly one of these will be set depending on :type param
  cbctClinic: { type: mongoose.Schema.Types.ObjectId, ref: "CBCT_OPG", default: null },
  dentalClinic: { type: mongoose.Schema.Types.ObjectId, ref: "DentalClinic", default: null },
  diagnosticLab: { type: mongoose.Schema.Types.ObjectId, ref: "DiagnosticLab", default: null }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
