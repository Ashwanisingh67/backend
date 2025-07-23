const express = require('express');
const mongoose = require('mongoose');
const database = require('./Config/db');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
    database();
});
