const express = require('express');
const getAllClinics = require('../Controllers/getAllclinics');

const router = express.Router();

router.get('/clinics', getAllClinics);

module.exports = router;
