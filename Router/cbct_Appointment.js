const express = require("express");
const router = express.Router();
const  bookCBCTAppointment = require("../Controllers/cbct_Opg_Appointment_Controller");
const auth = require("../Middleware/auth"); 
// console.log(auth)
// console.log(bookCBCTAppointment)
router.post("/appointment/:centerid", auth, bookCBCTAppointment);  
module.exports = router;
