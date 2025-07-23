const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');

// @route   POST /api/contacts
// @desc    Submit contact form
// @access  Public
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('organizationType').isIn(['nonprofit', 'sponsor', 'general', 'other']).withMessage('Valid organization type is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('message').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      phone,
      organizationName,
      organizationType,
      subject,
      message
    } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      organizationName,
      organizationType,
      subject,
      message
    });

    await contact.save();

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contact: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        organizationType: contact.organizationType,
        subject: contact.subject,
        status: contact.status
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contacts
// @desc    Get all contact submissions
// @access  Private (dashboard)
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      organizationType, 
      status,
      search 
    } = req.query;

    let query = {};

    if (organizationType) {
      query.organizationType = organizationType;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { organizationName: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(query);

    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalContacts: total
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contacts/:id
// @desc    Get contact by ID
// @access  Private
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/contacts/:id/status
// @desc    Update contact status
// @access  Private (admin)
router.put('/:id/status', [
  body('status').isIn(['new', 'contacted', 'in-progress', 'completed', 'closed']).withMessage('Valid status is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { status, assignedTo, responded } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.status = status;
    
    if (assignedTo) {
      contact.assignedTo = assignedTo;
    }

    if (responded !== undefined) {
      contact.responded = responded;
      if (responded) {
        contact.responseDate = new Date();
      }
    }

    await contact.save();

    res.json({
      message: 'Contact status updated successfully',
      contact
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/contacts/:id/notes
// @desc    Add note to contact
// @access  Private (admin)
router.post('/:id/notes', [
  body('note').notEmpty().withMessage('Note is required'),
  body('addedBy').notEmpty().withMessage('Note author is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { note, addedBy } = req.body;

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.notes.push({
      note,
      addedBy,
      date: new Date()
    });

    await contact.save();

    res.json({
      message: 'Note added successfully',
      contact
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/contacts/stats/overview
// @desc    Get contact statistics
// @access  Private (dashboard)
router.get('/stats/overview', async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const nonprofitContacts = await Contact.countDocuments({ organizationType: 'nonprofit' });
    const sponsorContacts = await Contact.countDocuments({ organizationType: 'sponsor' });
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email organizationType subject createdAt status');

    res.json({
      totalContacts,
      newContacts,
      nonprofitContacts,
      sponsorContacts,
      recentContacts
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 