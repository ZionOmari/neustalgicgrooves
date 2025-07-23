const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  // Contact Information
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
  
  // Organization Information
  organizationName: {
    type: String,
    trim: true
  },
  organizationType: {
    type: String,
    enum: ['nonprofit', 'sponsor', 'general', 'other'],
    required: true
  },
  
  // Inquiry Information
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  
  // Follow-up Information
  status: {
    type: String,
    enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: String
  },
  notes: [{
    note: String,
    addedBy: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Response Information
  responded: {
    type: Boolean,
    default: false
  },
  responseDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema); 