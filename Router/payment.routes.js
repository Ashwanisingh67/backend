// const express = require('express');
// const router = express.Router();
// const paymentController = require('../Controllers/payment.controller');

// // Dental service payment routes
// router.post('/dental/create-order', paymentController.createDentalServiceOrder);
// router.post('/dental/verify', paymentController.verifyPayment);

// module.exports = router;

const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/payment.controller');

// Subscription payment routes
router.post('/subscriptions/create-order', paymentController.createSubscriptionOrder);
router.post('/subscriptions/verify-payment', paymentController.verifySubscriptionPayment);
router.post('/payment-webhook', paymentController.handleWebhook);

module.exports = router;