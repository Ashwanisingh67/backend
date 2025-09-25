const express = require("express");
const patientRegistration= require("../Controllers/patientRegisteration")
const patientLogin = require("../Controllers/patientLogin");
const forgotPassword = require("../Controllers/forgotPassword");
const resetpassword = require("../Controllers/ResetPassword");
const PatientLogout=require("../Controllers/PatientLogout")


const router = express.Router();
router.post("/Registration",patientRegistration);
router.post("/Login",patientLogin);
router.post("/forget", forgotPassword)
router.post('/resetpassword/:token',resetpassword);
router.post('/Logout',PatientLogout)


module.exports=router