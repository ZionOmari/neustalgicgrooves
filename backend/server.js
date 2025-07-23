const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Trust proxy for rate limiting (fixes the X-Forwarded-For header error)
app.set('trust proxy', 1);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Middleware
app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/students', require('./routes/students'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/dashboard', require('./routes/dashboard'));

// MongoDB connection (removed deprecated options)
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neustalgic-grooves';

// Enhanced MongoDB connection with better error handling
mongoose.connect(mongoURI)
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.log('❌ MongoDB connection error:', err.message);
  console.log('💡 Running in development mode without MongoDB');
  console.log('💡 API endpoints will return mock data');
  
  // Set a flag to indicate we're running without MongoDB
  global.NO_DATABASE = true;
});

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB error:', err);
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Neustalgic Grooves API is running!' });
});

// Debug route
app.get('/api/debug', (req, res) => {
  res.json({ 
    message: 'Debug info',
    NO_DATABASE: global.NO_DATABASE,
    mongoState: mongoose.connection.readyState,
    mongoStateDesc: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 