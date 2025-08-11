const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser')
const database = require('./config/db');
const Cbci_opg_data=require('./Router/Cbci_opg_dataRoute');
const DentalRegistration=require('./Router/DentalRegisterRoute');
const diagnosticLab=require('./Router/DiagnosticLabsRoutes')
const Contact_US=require('./Router/Contact_Us_route');
const PharmaBrand=require('./Router/PharmaBrandRoute');
const patientRoute=require('./Router/patientRoute')
<<<<<<< HEAD
const appointmentRoute = require('./Router/appointment');
 

const cookieParser = require("cookie-parser");
=======
const fixMyTeeth = require('./Router/Fixmyteeth');
const appointment=require('./Router/appointment')
const Payment=require('./Router/payment.routes')
>>>>>>> 2d94dd650accda87c72d13517b19251ccc9aeb85
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();
// const fileUpload=require('express-fileupload')

app.use(express.json())
// app.use(fileUpload())
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
<<<<<<< HEAD
app.use('/',patientRoute)
app.use('/',appointmentRoute)
 
=======
app.use('/', Contact_US);
app.use('/', patientRoute);
app.use('/', fixMyTeeth);
app.use('/',Payment)
app.use('/',appointment)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Dental Tourism Clinics India Backend API',
    status: 'Running',
    endpoints: ['/health', '/dental-registration', '/cbct-opg', '/diagnostic-lab', '/pharma-brand', '/user']
  });
});


>>>>>>> 2d94dd650accda87c72d13517b19251ccc9aeb85
app.listen(PORT, () => {
   database();
  console.log(`Server is running on port ${PORT}`);
   
});
