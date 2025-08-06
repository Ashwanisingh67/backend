const express = require('express');
const cors = require('cors');
const database = require('./config/db');
const Cbci_opg_data=require('./Router/Cbci_opg_dataRoute');
const DentalRegistration=require('./Router/DentalRegisterRoute');
const diagnosticLab=require('./Router/DiagnosticLabsRoutes')
const Contact_US=require('./Router/Contact_Us_route');
const PharmaBrand=require('./Router/PharmaBrandRoute');
const patientRoute=require('./Router/patientRoute')
const appointmentRoute = require('./Router/appointment');
const cbctAppointment=require('./Router/cbct_Appointment')
 
const cookieParser = require("cookie-parser");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/', Cbci_opg_data);
app.use('/', DentalRegistration);
app.use('/', diagnosticLab);
app.use('/',PharmaBrand)
app.use('/',patientRoute)
app.use('/',appointmentRoute)
app.use('/',cbctAppointment)

app.listen(PORT, () => {
   database();
  console.log(`Server is running on port ${PORT}`);
   
});
