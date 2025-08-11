const express =require('express');
const router=express.Router();
const { bookAppointment, getAppointments }=require('../Controllers/appointmentController');
const auth = require('../Middleware/auth');
router.post('/appointment/:type/:centerId',auth,bookAppointment);
router.get('/getAppointment',auth,getAppointments)
module.exports=router;