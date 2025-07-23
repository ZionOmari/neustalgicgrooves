const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Scholarship = require('../models/Scholarship');
const Student = require('../models/Student');

// @route   POST /api/scholarships/apply
// @desc    Submit scholarship application
// @access  Public
router.post('/apply', [
  body('studentId').notEmpty().withMessage('Student ID is required'),
  body('householdIncome').isIn(['under-25k', '25k-50k', '50k-75k', '75k-100k', 'over-100k']).withMessage('Valid household income range is required'),
  body('numberOfDependents').isInt({ min: 0 }).withMessage('Number of dependents must be a non-negative integer'),
  body('whyDanceImportant').isLength({ min: 50, max: 500 }).withMessage('Please provide 50-500 characters explaining why dance is important'),
  body('howWillHelpChild').isLength({ min: 50, max: 500 }).withMessage('Please provide 50-500 characters explaining how this will help your child')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      studentId,
      householdIncome,
      numberOfDependents,
      whyDanceImportant,
      howWillHelpChild,
      additionalInfo
    } = req.body;

    // Check if student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Check if student already has a scholarship application
    const existingApplication = await Scholarship.findOne({ studentId });
    if (existingApplication) {
      return res.status(400).json({ message: 'Student already has a scholarship application' });
    }

    // Create scholarship application
    const scholarship = new Scholarship({
      studentId,
      householdIncome,
      numberOfDependents,
      whyDanceImportant,
      howWillHelpChild,
      additionalInfo
    });

    await scholarship.save();

    // Update student scholarship status
    await Student.findByIdAndUpdate(studentId, {
      scholarshipStatus: 'applied'
    });

    res.status(201).json({
      message: 'Scholarship application submitted successfully',
      application: scholarship
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/scholarships
// @desc    Get all scholarship applications
// @access  Private (dashboard)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = status ? { status } : {};

    const scholarships = await Scholarship.find(query)
      .populate('studentId', 'firstName lastName email phone parentName parentEmail')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Scholarship.countDocuments(query);

    res.json({
      scholarships,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalApplications: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/scholarships/:id
// @desc    Get scholarship application by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const scholarship = await Scholarship.findById(req.params.id)
      .populate('studentId', 'firstName lastName email phone dateOfBirth parentName parentEmail parentPhone');
    
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship application not found' });
    }

    res.json(scholarship);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/scholarships/:id/review
// @desc    Review scholarship application
// @access  Private (admin)
router.put('/:id/review', [
  body('status').isIn(['pending', 'under-review', 'approved', 'denied']).withMessage('Valid status is required'),
  body('reviewedBy').notEmpty().withMessage('Reviewer name is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, reviewedBy, reviewNotes, awardAmount, awardDuration } = req.body;

    const scholarship = await Scholarship.findById(req.params.id);
    if (!scholarship) {
      return res.status(404).json({ message: 'Scholarship application not found' });
    }

    scholarship.status = status;
    scholarship.reviewedBy = reviewedBy;
    scholarship.reviewDate = new Date();
    scholarship.reviewNotes = reviewNotes;
    
    if (status === 'approved') {
      scholarship.awardAmount = awardAmount || 0;
      scholarship.awardDuration = awardDuration;
    }

    await scholarship.save();

    // Update student scholarship status
    const studentStatus = status === 'approved' ? 'approved' : status === 'denied' ? 'denied' : 'applied';
    const updateData = { scholarshipStatus: studentStatus };
    
    if (status === 'approved' && awardAmount) {
      updateData.scholarshipAmount = awardAmount;
    }

    await Student.findByIdAndUpdate(scholarship.studentId, updateData);

    res.json({
      message: 'Scholarship application reviewed successfully',
      scholarship
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/scholarships/stats/overview
// @desc    Get scholarship statistics
// @access  Private (dashboard)
router.get('/stats/overview', async (req, res) => {
  try {
    const totalApplications = await Scholarship.countDocuments();
    const pendingApplications = await Scholarship.countDocuments({ status: 'pending' });
    const approvedApplications = await Scholarship.countDocuments({ status: 'approved' });
    const deniedApplications = await Scholarship.countDocuments({ status: 'denied' });
    
    const totalAwarded = await Scholarship.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$awardAmount' } } }
    ]);

    res.json({
      totalApplications,
      pendingApplications,
      approvedApplications,
      deniedApplications,
      totalAmountAwarded: totalAwarded[0]?.total || 0
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 