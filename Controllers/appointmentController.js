// controllers/appointmentController.js
const Appointment = require("../Models/appointmentModel");

const bookAppointment = async (req, res) => {
  try {
    const { date, time, bookingFor, personName, personEmail, personPhone } = req.body;
    const bookedBy = req.user._id; // from auth middleware

    // Validation
    if (!date || !time || !bookingFor) {
      return res.status(400).json({ message: "Date, time, and bookingFor are required" });
    }
    if (!personName || !personEmail || !personPhone) {
      return res.status(400).json({ message: "Name, email, and phone are required" });
    }

    const appointment = new Appointment({
      date,
      time,
      bookingFor,
      bookedBy,
      personName,
      personEmail,
      personPhone
    });

    await appointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment });

  } catch (error) {
    res.status(500).json({ message: "Error booking appointment", error: error.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ bookedBy: req.user._id })
      .populate("bookedBy", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error: error.message });
  }
};

module.exports = { bookAppointment, getAppointments };
