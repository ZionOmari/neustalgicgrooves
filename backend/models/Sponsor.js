const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  // Sponsor Information
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  
  // Organization Information (if applicable)
  organizationName: {
    type: String,
    trim: true
  },
  
  // Sponsorship Information
  sponsorshipType: {
    type: String,
    enum: ['student-sponsor', 'dance-bag-kit', 'general-donation'],
    required: true
  },
  
  // Payment Information
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  stripePaymentId: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  
  // Student Sponsorship (if applicable)
  sponsoredStudent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  
  // Recognition Preferences
  publicRecognition: {
    type: Boolean,
    default: true
  },
  recognitionName: {
    type: String // Name to use for public recognition if different from actual name
  },
  
  // Communication Preferences
  newsletter: {
    type: Boolean,
    default: true
  },
  updates: {
    type: Boolean,
    default: true
  },
  
  // Additional Information
  notes: {
    type: String
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurringFrequency: {
    type: String,
    enum: ['monthly', 'quarterly', 'annually']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Sponsor', sponsorSchema); 