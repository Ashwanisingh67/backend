const createContactUs = require('../Controllers/create_Contact_Us');
const getContactUs = require('../Controllers/get_Contact_us');
const express = require('express');
const router = express.Router();

// Route to create a new contact us entry
router.post('/contact-us', createContactUs);
// Route to get all contact us entries
router.get('/contact-us', getContactUs);
// Export the router

module.exports = router;