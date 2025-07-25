const userRegistration=require('../Controllers/userRegisteration')
const express = require('express');
const router = express.Router();

router.post('/user_register', userRegistration);

module.exports = router;
