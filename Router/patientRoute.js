const express = require("express");
const patientRegistration= require("../Controllers/patientRegisteration")
const patientLogin = require("../Controllers/patientLogin");


const router = express.Router();
router.post("/Registration",patientRegistration);
router.post("/Login",patientLogin);

module.exports=router