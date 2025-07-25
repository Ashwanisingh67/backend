const userLogin = require('../Controllers/userLogin');
const express = require('express');
const router = express.Router();    
router.post('/user_login', userLogin);
module.exports = router;