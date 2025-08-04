const express = require('express');
const database = require('./Config/db');
const Cbci_opg_data=require('./Router/Cbci_opg_dataRoute');
const DentalRegistration=require('./Router/DentalRegisterRoute');
const diagnosticLab=require('./Router/DiagnosticLabsRoutes')
const PharmaBrand=require('./Router/PharmaBrandRoute');
const patientRoute=require('./Router/patientRoute')
const appointmentRoute = require('./Router/appointment'); // ✅ correct
const cookieParser = require("cookie-parser");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/', Cbci_opg_data);
app.use('/', DentalRegistration);
app.use('/', diagnosticLab);
app.use('/',PharmaBrand)
app.use('/',patientRoute)
app.use('/',appointmentRoute)


app.listen(PORT, () => {
   database();
  console.log(`Server is running on port ${PORT}`);
   
});
