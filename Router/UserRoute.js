const express = require("express");
const userRegistration= require("../Controllers/userRegisteration")
const userLogin = require("../Controllers/userLogin");

const router = express.Router();
router.post("/Registration",userRegistration);
router.post("/Login",userLogin);

module.exports=router