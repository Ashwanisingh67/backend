// Simple Express server with Mongoose for local hosting
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/dental_tourism';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Example route

// User routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

// Analytics routes
const analyticsRoutes = require('./routes/analytics');
app.use('/api', analyticsRoutes);

app.get('/', (req, res) => {
  res.send('Dental Tourism Local Server Running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
