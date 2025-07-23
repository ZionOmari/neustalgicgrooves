const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  // File Information
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  
  // Type Classification
  type: {
    type: String,
    enum: ['photo', 'video'],
    required: true
  },
  
  // Display Information
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  
  // Event/Class Information
  eventName: {
    type: String,
    trim: true
  },
  eventDate: {
    type: Date
  },
  instructor: {
    type: String,
    trim: true
  },
  classType: {
    type: String,
    enum: ['kids-breaking', 'adult-breaking', 'funk-styles', 'private-lesson', 'event']
  },
  
  // File Storage
  filePath: {
    type: String,
    required: true
  },
  thumbnailPath: {
    type: String // For videos
  },
  
  // Visibility and Status
  isPublic: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  
  // Metadata
  uploadedBy: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  
  // Social Features
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema); 