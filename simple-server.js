const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3001', // React dev server typically runs on 3001
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/dentaltourismclinicsindia';
mongoose.connect(MONGO_URL)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err.message));

// Test routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Dental Tourism Clinics India Backend API',
    status: 'Running',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      auth: '/auth/*',
      clinics: '/clinics',
      dentists: '/dentists',
      appointments: '/appointments'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend server is running',
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// Basic auth routes for testing
app.post('/auth/login', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Login endpoint working',
    token: 'test-token-123'
  });
});

app.post('/auth/register', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Register endpoint working'
  });
});

// Basic clinic routes for testing
app.get('/clinics', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Clinics endpoint working',
    data: []
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📱 Frontend should connect to: http://localhost:${PORT}`);
});
