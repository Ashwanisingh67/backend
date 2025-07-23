const express = require('express');
const mongoose = require('mongoose');
const database = require('./Config/db');
const CPCT_OPG_route = require('./Router/CPCT_OPG_route');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', CPCT_OPG_route);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    database();
});
