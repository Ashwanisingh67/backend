const express=require('express')
const auth = require('../Middleware/auth')
const dentalAppointment = require('../Controllers/dentalAppointment')


const router=express.Router()

router.post('/dentalappointment/:dentalid',auth,dentalAppointment)
module.exports=router
