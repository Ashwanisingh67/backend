const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/payment.controller');

// Dental service payment routes
router.post('/dental/create-order', paymentController.createDentalServiceOrder);
router.post('/dental/verify', paymentController.verifyPayment);

module.exports = router;