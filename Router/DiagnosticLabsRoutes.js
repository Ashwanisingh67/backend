const createDiagnosticLab = require("../Controllers/createDiagnosticLab");
const getDiagnosticLab = require("../Controllers/getDiagnosticLab");
const express = require("express");

const router = express.Router();
//routes
router.post("/diagnostic-labs", createDiagnosticLab);
router.get("/diagnostic-labs", getDiagnosticLab);

module.exports = router;
