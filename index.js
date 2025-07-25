const express = require('express');
const database = require('./Config/db');
const CPCT_OPG_route = require('./Router/CPCT_OPG_route');
const userRegisterRoute = require('./Router/userRegisterRoute');
const userLoginRoute = require('./Router/userLoginRouter');
const cookieParser = require('cookie-parser');
 
require('dotenv').config();


const app = express()
app.use(express.json());
app.use(cookieParser());
app.use('/api', CPCT_OPG_route);
app.use('/api', userRegisterRoute);
app.use('/api', userLoginRoute);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    database();
});
