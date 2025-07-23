const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Student = require('../models/Student');

// @route   POST /api/students/register
// @desc    Register a new student
// @access  Public
router.post('/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('dateOfBirth').isISO8601().withMessage('Please provide a valid date of birth'),
  body('emergencyContactName').notEmpty().withMessage('Emergency contact name is required'),
  body('emergencyContactPhone').notEmpty().withMessage('Emergency contact phone is required'),
  body('emergencyContactRelation').notEmpty().withMessage('Emergency contact relation is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName, lastName, email, phone, dateOfBirth,
      parentName, parentEmail, parentPhone,
      emergencyContactName, emergencyContactPhone, emergencyContactRelation,
      waiverSignature
    } = req.body;

    // Check if student already exists
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ message: 'Student with this email already exists' });
    }

    // Create new student
    student = new Student({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      parentName,
      parentEmail,
      parentPhone,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      waiverSigned: !!waiverSignature,
      waiverSignedDate: waiverSignature ? new Date() : null,
      waiverSignature
    });

    await student.save();

    res.status(201).json({
      message: 'Student registered successfully',
      student: {
        id: student._id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        waiverSigned: student.waiverSigned
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/students
// @desc    Get all students
// @access  Private (dashboard)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const query = search ? {
      $or: [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ]
    } : {};

    const students = await Student.find(query)
      .populate('sponsor')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Student.countDocuments(query);

    res.json({
      students,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalStudents: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/students/:id
// @desc    Get student by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('sponsor');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/students/:id/first-class
// @desc    Mark student's first class as taken
// @access  Private
router.put('/:id/first-class', async (req, res) => {
  try {
    const { className, instructor } = req.body;
    
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.firstClassTaken = true;
    student.firstClassDate = new Date();
    student.classesAttended.push({
      className,
      date: new Date(),
      instructor
    });

    await student.save();
    res.json({ message: 'First class marked as taken', student });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/students/:id/payment-status
// @desc    Update student payment status
// @access  Private
router.put('/:id/payment-status', async (req, res) => {
  try {
    const { paymentStatus, amount, stripePaymentId, description } = req.body;
    
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    student.paymentStatus = paymentStatus;
    
    if (amount && stripePaymentId) {
      student.paymentHistory.push({
        amount,
        date: new Date(),
        stripePaymentId,
        description: description || 'Payment'
      });
    }

    await student.save();
    res.json({ message: 'Payment status updated', student });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 