const express =require('express');
const router=express.Router();
const { bookAppointment, getAppointments }=require('../Controllers/appointmentController');
const { protect } = require('../Middleware/protect');
router.post('/appointment',protect,bookAppointment);
router.get('/getAppointment',protect,getAppointments)
module.exports=router;