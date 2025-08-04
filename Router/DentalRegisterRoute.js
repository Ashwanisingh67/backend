const express = require("express");
const dentalRegistrationSchema = require("../Controllers/createDentalRegistration");
const singleUpload = require("../Middleware/multer");
const getDentalRegistration = require("../Controllers/getDentalRegistration");
const multipleUpload = require("../Middleware/multer");
const upload = require("../Middleware/multer");
const router = express.Router();
//routes

router.post("/dental-register",upload,dentalRegistrationSchema);
router.get("/dental-register", getDentalRegistration);
module.exports = router;
