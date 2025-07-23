const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  // Student Information
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  
  // Application Information
  applicationDate: {
    type: Date,
    default: Date.now
  },
  
  // Financial Information
  householdIncome: {
    type: String,
    required: true,
    enum: ['under-25k', '25k-50k', '50k-75k', '75k-100k', 'over-100k']
  },
  numberOfDependents: {
    type: Number,
    required: true
  },
  
  // Essay Questions
  whyDanceImportant: {
    type: String,
    required: true,
    maxlength: 500
  },
  howWillHelpChild: {
    type: String,
    required: true,
    maxlength: 500
  },
  additionalInfo: {
    type: String,
    maxlength: 300
  },
  
  // Application Status
  status: {
    type: String,
    enum: ['pending', 'under-review', 'approved', 'denied'],
    default: 'pending'
  },
  reviewedBy: {
    type: String
  },
  reviewDate: {
    type: Date
  },
  reviewNotes: {
    type: String
  },
  
  // Award Information
  awardAmount: {
    type: Number,
    default: 0
  },
  awardDuration: {
    type: String, // e.g., "3 months", "1 semester"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', scholarshipSchema); 