const diagnosticModel=require('../Models/Diagnostic_Labmodel')
const patientModel=require('../Models/patientModel')
const appointmentModel=require('../Models/appointmentModel')

const diagnosticAppointment=async(req,res)=>{
    try {
   const {date,time,bookingFor,personName,personEmail,personPhone}=req.body;
   const labID=req.params.labid;
   const bookedBy=req.user._id;
   console.log(personPhone);
   
   if(!date||!time||!bookingFor||!personName||!personEmail||!personPhone){
    return res.status(400).json({
        message:"Date, time, bookingFor, personName, personEmail, and personPhone are required" 
    });
   }
   if(!["self","other"].includes(bookingFor)){
     return res.status(400).json({ message: "Invalid bookingFor value. Use 'self' or 'other'" });
   }
      const diagnosticLab=await diagnosticModel.findById(labID) 
      if(!labID){
        return res.status(404).json({
            message:"diagnostic lab not found"
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
    // console.log(appointment._id);
   diagnosticLab.appointments.push(appointment._id); 
   await diagnosticLab.save();

   const patient=await patientModel.findById(bookedBy);
   patient.diagnostic_appointments.push(labID);
   await patient.save()

   const appointments=await appointmentModel.find({ bookedBy }).populate("bookedBy", "name email");
    
   res.status(201).json({
      message: `Diagnostic Lab appointment booked successfully for ${bookingFor === "self" ? "yourself" : "someone else"}`,
      appointment,
      allAppointments: appointments
    });
    }  catch (error) {
    res.status(500).json({ message: "Error booking CBCT appointment", error: error.message });
  }
}
module.exports=diagnosticAppointment