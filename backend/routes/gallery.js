const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { body, validationResult } = require('express-validator');
const GalleryItem = require('../models/GalleryItem');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../uploads/gallery');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  }
});

// @route   POST /api/gallery/upload
// @desc    Upload new gallery item
// @access  Private (admin)
router.post('/upload', upload.single('file'), [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('eventName').optional().trim(),
  body('instructor').optional().trim(),
  body('classType').optional().isIn(['kids-breaking', 'adult-breaking', 'funk-styles', 'private-lesson', 'event']),
  body('uploadedBy').notEmpty().withMessage('Uploader name is required'),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const {
      title,
      description,
      eventName,
      eventDate,
      instructor,
      classType,
      uploadedBy,
      tags,
      isPublic = true
    } = req.body;

    const type = req.file.mimetype.startsWith('image/') ? 'photo' : 'video';

    const galleryItem = new GalleryItem({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      size: req.file.size,
      type,
      title,
      description,
      eventName,
      eventDate: eventDate ? new Date(eventDate) : null,
      instructor,
      classType,
      filePath: req.file.path,
      isPublic,
      uploadedBy,
      tags: tags ? JSON.parse(tags) : []
    });

    await galleryItem.save();

    res.status(201).json({
      message: 'File uploaded successfully',
      galleryItem
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gallery
// @desc    Get gallery items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      type,
      classType,
      instructor,
      search,
      isPublic = true
    } = req.query;

    let query = { isActive: true };

    if (isPublic === 'true') {
      query.isPublic = true;
    }

    if (type) {
      query.type = type;
    }

    if (classType) {
      query.classType = classType;
    }

    if (instructor) {
      query.instructor = { $regex: instructor, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { eventName: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const galleryItems = await GalleryItem.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await GalleryItem.countDocuments(query);

    res.json({
      galleryItems,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalItems: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gallery/:id
// @desc    Get gallery item by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Increment views
    galleryItem.views += 1;
    await galleryItem.save();

    res.json(galleryItem);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
// @access  Private (admin)
router.put('/:id', [
  body('title').optional().trim(),
  body('description').optional().trim(),
  body('eventName').optional().trim(),
  body('instructor').optional().trim(),
  body('classType').optional().isIn(['kids-breaking', 'adult-breaking', 'funk-styles', 'private-lesson', 'event']),
  body('tags').optional().isArray()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const updateData = req.body;
    if (updateData.eventDate) {
      updateData.eventDate = new Date(updateData.eventDate);
    }

    const galleryItem = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    res.json({
      message: 'Gallery item updated successfully',
      galleryItem
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
// @access  Private (admin)
router.delete('/:id', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    // Delete file from filesystem
    if (fs.existsSync(galleryItem.filePath)) {
      fs.unlinkSync(galleryItem.filePath);
    }

    await GalleryItem.findByIdAndDelete(req.params.id);

    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/gallery/:id/like
// @desc    Like gallery item
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const galleryItem = await GalleryItem.findById(req.params.id);
    if (!galleryItem) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }

    galleryItem.likes += 1;
    await galleryItem.save();

    res.json({
      message: 'Gallery item liked',
      likes: galleryItem.likes
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gallery/serve/:filename
// @desc    Serve gallery files
// @access  Public
router.get('/serve/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads/gallery', filename);
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ message: 'File not found' });
  }
});

module.exports = router; 