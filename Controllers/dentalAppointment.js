const patientModel=require('../Models/patientModel')
const appointmentModel=require('../Models/appointmentModel')
const dentalModel=require('../Models/DentalRegistration_model')
const dentalAppointment=async(req,res)=>{
  try {
      const {date,time,bookingFor,personName,personEmail,personPhone}=req.body
    const dentalID=req.params.dentalid
    const bookedBy=req.user._id

    if(!date||!time||!bookingFor||!personName||!personEmail||!personPhone){
        return res.status(400).json({
            message:"date,time,bookingFor,personName,personEmail,personPhone are required"
        });
    }
    if(!["self","other"].includes(bookingFor)){
        return res.status(400).json({message:"Invalid bookingFor value. Use 'self' or 'other' "})
    }

    const dentalClinic=await dentalModel.findById(dentalID)

    if(!dentalClinic){
        return res.status(404).json({
            message:"Dental Clinic not found"
        })
    }

    const appointment=await appointmentModel.create({
      date,
      time,
      bookingFor,
      bookedBy,
      personName,
      personEmail,
      personPhone
    })
    dentalClinic.appointments.push(appointment._id)
    await  dentalClinic.save()

    const patient= await patientModel.findById(bookedBy)
    patient.dentalClinic_appointments.push(dentalClinic._id)
    await patient.save()

    const appointments = await appointmentModel.find({ bookedBy }).populate("bookedBy", "name email");
    
        res.status(201).json({
          message: `CBCT appointment booked successfully for ${bookingFor === "self" ? "yourself" : "someone else"}`,
          appointment,
          allAppointments: appointments
        });

  } catch (error) {
    res.status(500).json({ message: "Error booking CBCT appointment", error: error.message });
  }
}

module.exports=dentalAppointment