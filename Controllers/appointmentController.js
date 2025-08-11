const Appointment = require("../Models/appointmentModel");
const CBCT_OPG = require("../Models/CBCT_OPG_Model");
const DentalClinic = require("../Models/DentalRegistration_model");
const DiagnosticLab = require("../Models/Diagnostic_Labmodel");

// Book appointment — Only logged-in user
const bookAppointment = async (req, res) => {
  try {
    const { date, time, bookingFor, personName, personEmail, personPhone } = req.body;
    const { type, centerId } = req.params; 
    const bookedBy = req.user._id;

    // Validate required fields
    if (!date || !time || !centerId || !type || !personName || !personEmail || !personPhone) {
      return res.status(400).json({ message: "Date, time, centerId, type, personName, personEmail, and personPhone are required" });
    }

    // Find provider based on type
    let providerFound;
    if (type === "cbct") providerFound = await CBCT_OPG.findById(centerId);
    if (type === "dental") providerFound = await DentalClinic.findById(centerId);
    if (type === "lab") providerFound = await DiagnosticLab.findById(centerId);

    if (!providerFound) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Prepare appointment object
    const appointmentData = {
      date,
      time,
      bookingFor,
      bookedBy,
      personName,
      personEmail,
      personPhone
    };

    if (type === "cbct") appointmentData.cbctClinic = centerId;
    if (type === "dental") appointmentData.dentalClinic = centerId;
    if (type === "lab") appointmentData.diagnosticLab = centerId;

    const newAppointment = await Appointment.create(appointmentData);

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all appointments of logged-in user
const getAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ bookedBy: userId })
      .sort({ date: 1, time: 1 })
      .populate("bookedBy", "name email phoneNumber")
      .populate({
        path: "cbctClinic",
        model: "CBCT_OPG",
        select: "centerName ownerName email phoneNumber address website_url"
      })
      .populate({
        path: "dentalClinic",
        model: "DentalRegistration",
        select: "ClinicName ClinicPhoneNumber ClinicAddress email"
      })
      .populate({
        path: "diagnosticLab",
        model: "DiagnosticLab",
        select: "labName OwnerName email phoneNumber address websiteURL"
      })
      .lean();

    return res.status(200).json({ appointments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { bookAppointment, getAppointments };
