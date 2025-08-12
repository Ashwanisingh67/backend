// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const patientModel = require("../Models/patientModel");
require('dotenv').config();

const  auth= async (req, res, next) => {
  let token;

  try {
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

 
    const decoded = jwt.verify(token, process.env.SECRET_KEY || "tarzen");
 
    const user = await patientModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

  
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({ message: "Not authorized, token invalid or expired" });
  }
};

module.exports = auth;
