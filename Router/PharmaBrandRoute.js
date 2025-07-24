const express = require('express');
const createPharmaBrand = require('../Controllers/createPharmaBrand');
const getPharmaBrand = require('../Controllers/getPharmaBrand');

const router = express.Router();
router.post("/pharma-brand",createPharmaBrand);
router.get("/pharma-brand",getPharmaBrand)
module.exports = router;