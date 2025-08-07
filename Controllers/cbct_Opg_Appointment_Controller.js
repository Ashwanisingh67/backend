const Appointment=require('../Models/appointmentModel')
const Patient=require('../Models/patientModel')
const CBCT_OPG=require('../Models/CBCT_OPG_Model')
const bookCBCTAppointment = async (req, res) => {
  try {
    const { date, time, bookingFor, personName, personEmail, personPhone } = req.body;
    const  centerId= req.params.centerid; 
    const bookedBy = req.user._id;

    // Required fields
    if (!date || !time || !bookingFor || !personName || !personEmail || !personPhone) {
      return res.status(400).json({ 
        message: "Date, time, bookingFor, personName, personEmail, and personPhone are required" 
      });
    }

    // Validate bookingFor value
    if (!["self", "other"].includes(bookingFor)) {
      return res.status(400).json({ message: "Invalid bookingFor value. Use 'self' or 'other'" });
    }
    // console.log(req.params.centerid);
    
    // Check CBCT center exists
    const cbctCenter = await CBCT_OPG.findById(centerId);

    if (!centerId) {
      return res.status(404).json({ message: "CBCT center not found" });
    }

    // Create appointment
    const appointment = await Appointment.create({
      date,
      time,
      bookingFor,
      bookedBy,
      personName,
      personEmail,
      personPhone
    });

    // Link to CBCT center
    cbctCenter.appointments.push(appointment._id);
    await cbctCenter.save();

    // Link to patient
    const patient = await Patient.findById(bookedBy);
    patient.CBCT_OPG_appointments.push(cbctCenter._id);
    await patient.save();

    // Get all appointments for this user
    const appointments = await Appointment.find({ bookedBy }).populate("bookedBy", "name email");

    res.status(201).json({
      message: `CBCT appointment booked successfully for ${bookingFor === "self" ? "yourself" : "someone else"}`,
      appointment,
      allAppointments: appointments
    });

  } catch (error) {
    res.status(500).json({ message: "Error booking CBCT appointment", error: error.message });
  }
};

module.exports =  bookCBCTAppointment;
