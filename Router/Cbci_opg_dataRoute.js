const CBCI_OPG_registeration = require('../Controllers/create_CBCI_OPG_registeration');
const CBCI_OPG_data = require('../Controllers/get_CBCI_OPG_data');
const express = require('express');
const router = express.Router();
//routes
router.get('/CBCI_OPG_data',CBCI_OPG_data);
router.post('/CBCI_OPG_register', CBCI_OPG_registeration);

module.exports = router;
