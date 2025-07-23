const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Safely import Student model
let Student;
try {
  Student = require('../models/Student');
} catch (error) {
  console.log('Student model not available - using mock data');
  Student = null;
}

// Mock data for development when MongoDB is not available
const mockStudents = [
  {
    id: '1',
    firstName: 'Marcus',
    lastName: 'Johnson',
    email: 'marcus.j@email.com',
    phone: '555-0101',
    dateOfBirth: '2005-03-15',
    waiverSigned: true,
    paymentStatus: 'paid',
    firstClassTaken: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2', 
    firstName: 'Sofia',
    lastName: 'Rodriguez',
    email: 'sofia.r@email.com',
    phone: '555-0102',
    dateOfBirth: '2004-08-22',
    waiverSigned: true,
    paymentStatus: 'paid',
    firstClassTaken: false,
    createdAt: new Date('2024-01-10')
  },
  {
    id: '3',
    firstName: 'Jamal',
    lastName: 'Williams',
    email: 'jamal.w@email.com', 
    phone: '555-0103',
    dateOfBirth: '2006-12-03',
    waiverSigned: true,
    paymentStatus: 'pending',
    firstClassTaken: false,
    createdAt: new Date('2024-01-08')
  }
];

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

    // If no database, return mock success response
    if (global.NO_DATABASE || !Student) {
      const { firstName, lastName, email } = req.body;
      return res.status(201).json({
        message: 'Student registered successfully (mock data)',
        student: {
          id: `mock-${Date.now()}`,
          firstName,
          lastName,
          email,
          waiverSigned: true
        }
      });
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
    // For now, always return mock data for development
    return res.json({
      students: mockStudents,
      totalPages: 1,
      currentPage: 1,
      totalStudents: mockStudents.length,
      message: 'Using mock data for development'
    });

    // Original database code (commented out for debugging)
    /*
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
    */
  } catch (error) {
    console.error('Students route error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
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