const express = require("express");
const createDentalRegistration = require("../Controllers/createDentalRegistration");
const singleUpload = require("../Middleware/multer");
const getDentalRegistration = require("../Controllers/getDentalRegistration");
const router = express.Router();
//routes

router.post("/dental-register", singleUpload, createDentalRegistration);
router.get("/dental-register", getDentalRegistration);
module.exports = router;
