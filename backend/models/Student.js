const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  // Personal Information
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  
  // Parent/Guardian Information (for minors)
  parentName: {
    type: String,
    trim: true
  },
  parentEmail: {
    type: String,
    lowercase: true
  },
  parentPhone: {
    type: String
  },
  
  // Emergency Contact
  emergencyContactName: {
    type: String,
    required: true
  },
  emergencyContactPhone: {
    type: String,
    required: true
  },
  emergencyContactRelation: {
    type: String,
    required: true
  },
  
  // Waiver and Legal
  waiverSigned: {
    type: Boolean,
    default: false
  },
  waiverSignedDate: {
    type: Date
  },
  waiverSignature: {
    type: String // Base64 encoded signature
  },
  
  // Class Information
  firstClassTaken: {
    type: Boolean,
    default: false
  },
  firstClassDate: {
    type: Date
  },
  classesAttended: [{
    className: String,
    date: Date,
    instructor: String
  }],
  
  // Payment Information
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentHistory: [{
    amount: Number,
    date: Date,
    stripePaymentId: String,
    description: String
  }],
  
  // Scholarship Information
  scholarshipStatus: {
    type: String,
    enum: ['none', 'applied', 'approved', 'denied'],
    default: 'none'
  },
  scholarshipAmount: {
    type: Number,
    default: 0
  },
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sponsor'
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema); 