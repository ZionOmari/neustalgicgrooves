const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
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

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/neustalgic-grooves';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Neustalgic Grooves API is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 