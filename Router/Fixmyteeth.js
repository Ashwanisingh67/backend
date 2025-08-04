const express = require("express");
const createFixMyTeeth = require("../Controllers/create_fix_my_teeth");
const singleUpload = require("../Middleware/multer");
const getFixMyTeeth = require("../Controllers/get_fix_my_teeth");
// Create a new router instance
const router = express.Router();
// Route to create a new Fix My Teeth entry
router.post("/fix-my-teeth", createFixMyTeeth);
// Route to get all Fix My Teeth entries
router.get("/fix-my-teeth", getFixMyTeeth);
// Export the router
module.exports = router;    
