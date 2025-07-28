const express = require('express');
const database = require('./Config/db');
const Cbci_opg_data=require('./Router/Cbci_opg_dataRoute');
const DentalRegistration=require('./Router/DentalRegisterRoute');
const diagnosticLab=require('./Router/DiagnosticLabsRoutes')
const PharmaBrand=require('./Router/PharmaBrandRoute');
const UserRoute=require('./Router/UserRoute');
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', Cbci_opg_data);
app.use('/', DentalRegistration);
app.use('/', diagnosticLab);
app.use('/',PharmaBrand)
app.use('/',UserRoute)


app.listen(PORT, () => {
   database();
  console.log(`Server is running on port ${PORT}`);
   
});
