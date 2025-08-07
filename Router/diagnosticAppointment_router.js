const express=require('express')
const auth = require('../Middleware/auth')
const diagnosticAppointment = require('../Controllers/diagnosticAppointment')
const router=express.Router()


router.post('/Diagnosticappointment/:labid',auth,diagnosticAppointment)
module.exports=router;