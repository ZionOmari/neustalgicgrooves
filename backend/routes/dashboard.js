const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Scholarship = require('../models/Scholarship');
const Contact = require('../models/Contact');
const Sponsor = require('../models/Sponsor');
const GalleryItem = require('../models/GalleryItem');

// @route   GET /api/dashboard/overview
// @desc    Get dashboard overview statistics
// @access  Private (admin)
router.get('/overview', async (req, res) => {
  try {
    // Student statistics
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ isActive: true });
    const studentsWithWaivers = await Student.countDocuments({ waiverSigned: true });
    const studentsFirstClassTaken = await Student.countDocuments({ firstClassTaken: true });
    
    // Payment statistics
    const paidStudents = await Student.countDocuments({ paymentStatus: 'paid' });
    const pendingPayments = await Student.countDocuments({ paymentStatus: 'pending' });
    const overduePayments = await Student.countDocuments({ paymentStatus: 'overdue' });
    
    // Scholarship statistics
    const totalScholarshipApplications = await Scholarship.countDocuments();
    const approvedScholarships = await Scholarship.countDocuments({ status: 'approved' });
    const pendingScholarships = await Scholarship.countDocuments({ status: 'pending' });
    
    // Contact statistics
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: 'new' });
    const sponsorInquiries = await Contact.countDocuments({ organizationType: 'sponsor' });
    const nonprofitInquiries = await Contact.countDocuments({ organizationType: 'nonprofit' });
    
    // Sponsorship statistics
    const totalSponsors = await Sponsor.countDocuments();
    const studentSponsors = await Sponsor.countDocuments({ sponsorshipType: 'student-sponsor' });
    const totalSponsorshipAmount = await Sponsor.aggregate([
      { $match: { paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Gallery statistics
    const totalGalleryItems = await GalleryItem.countDocuments({ isActive: true });
    const totalPhotos = await GalleryItem.countDocuments({ type: 'photo', isActive: true });
    const totalVideos = await GalleryItem.countDocuments({ type: 'video', isActive: true });

    // Recent activity
    const recentStudents = await Student.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('firstName lastName email createdAt waiverSigned');

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email organizationType subject status createdAt');

    res.json({
      students: {
        total: totalStudents,
        active: activeStudents,
        withWaivers: studentsWithWaivers,
        firstClassTaken: studentsFirstClassTaken,
        waiverPercentage: totalStudents > 0 ? Math.round((studentsWithWaivers / totalStudents) * 100) : 0
      },
      payments: {
        paid: paidStudents,
        pending: pendingPayments,
        overdue: overduePayments,
        paidPercentage: totalStudents > 0 ? Math.round((paidStudents / totalStudents) * 100) : 0
      },
      scholarships: {
        total: totalScholarshipApplications,
        approved: approvedScholarships,
        pending: pendingScholarships,
        approvalRate: totalScholarshipApplications > 0 ? Math.round((approvedScholarships / totalScholarshipApplications) * 100) : 0
      },
      contacts: {
        total: totalContacts,
        new: newContacts,
        sponsorInquiries,
        nonprofitInquiries
      },
      sponsorships: {
        total: totalSponsors,
        studentSponsors,
        totalAmount: totalSponsorshipAmount[0]?.total || 0
      },
      gallery: {
        total: totalGalleryItems,
        photos: totalPhotos,
        videos: totalVideos
      },
      recentActivity: {
        students: recentStudents,
        contacts: recentContacts
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/dashboard/analytics/monthly
// @desc    Get monthly analytics data
// @access  Private (admin)
router.get('/analytics/monthly', async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.query;
    
    const monthlyData = [];
    
    for (let month = 0; month < 12; month++) {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      
      const studentsRegistered = await Student.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      
      const scholarshipApplications = await Scholarship.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      
      const contactSubmissions = await Contact.countDocuments({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      
      const sponsorshipAmount = await Sponsor.aggregate([
        {
          $match: {
            createdAt: { $gte: startDate, $lte: endDate },
            paymentStatus: 'completed'
          }
        },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]);
      
      monthlyData.push({
        month: month + 1,
        monthName: new Date(year, month).toLocaleString('default', { month: 'long' }),
        studentsRegistered,
        scholarshipApplications,
        contactSubmissions,
        sponsorshipAmount: sponsorshipAmount[0]?.total || 0
      });
    }
    
    res.json(monthlyData);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/dashboard/export/students
// @desc    Export students data as CSV
// @access  Private (admin)
router.get('/export/students', async (req, res) => {
  try {
    const students = await Student.find().populate('sponsor');
    
    let csvContent = 'First Name,Last Name,Email,Phone,Date of Birth,Parent Name,Parent Email,Parent Phone,Emergency Contact Name,Emergency Contact Phone,Emergency Contact Relation,Waiver Signed,Waiver Signed Date,First Class Taken,First Class Date,Payment Status,Scholarship Status,Scholarship Amount,Sponsor Name,Registration Date\n';
    
    students.forEach(student => {
      csvContent += `"${student.firstName}","${student.lastName}","${student.email}","${student.phone}","${student.dateOfBirth ? student.dateOfBirth.toDateString() : ''}","${student.parentName || ''}","${student.parentEmail || ''}","${student.parentPhone || ''}","${student.emergencyContactName}","${student.emergencyContactPhone}","${student.emergencyContactRelation}","${student.waiverSigned}","${student.waiverSignedDate ? student.waiverSignedDate.toDateString() : ''}","${student.firstClassTaken}","${student.firstClassDate ? student.firstClassDate.toDateString() : ''}","${student.paymentStatus}","${student.scholarshipStatus}","${student.scholarshipAmount}","${student.sponsor ? student.sponsor.name : ''}","${student.createdAt.toDateString()}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.send(csvContent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/dashboard/export/scholarships
// @desc    Export scholarship applications as CSV
// @access  Private (admin)
router.get('/export/scholarships', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().populate('studentId');
    
    let csvContent = 'Student Name,Student Email,Application Date,Household Income,Number of Dependents,Why Dance Important,How Will Help Child,Additional Info,Status,Reviewed By,Review Date,Award Amount,Award Duration\n';
    
    scholarships.forEach(scholarship => {
      const student = scholarship.studentId;
      csvContent += `"${student ? student.firstName + ' ' + student.lastName : ''}","${student ? student.email : ''}","${scholarship.applicationDate.toDateString()}","${scholarship.householdIncome}","${scholarship.numberOfDependents}","${scholarship.whyDanceImportant}","${scholarship.howWillHelpChild}","${scholarship.additionalInfo || ''}","${scholarship.status}","${scholarship.reviewedBy || ''}","${scholarship.reviewDate ? scholarship.reviewDate.toDateString() : ''}","${scholarship.awardAmount || ''}","${scholarship.awardDuration || ''}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=scholarships.csv');
    res.send(csvContent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/dashboard/export/contacts
// @desc    Export contacts as CSV
// @access  Private (admin)
router.get('/export/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    
    let csvContent = 'Name,Email,Phone,Organization Name,Organization Type,Subject,Message,Status,Assigned To,Responded,Response Date,Created Date\n';
    
    contacts.forEach(contact => {
      csvContent += `"${contact.name}","${contact.email}","${contact.phone || ''}","${contact.organizationName || ''}","${contact.organizationType}","${contact.subject}","${contact.message.replace(/"/g, '""')}","${contact.status}","${contact.assignedTo || ''}","${contact.responded}","${contact.responseDate ? contact.responseDate.toDateString() : ''}","${contact.createdAt.toDateString()}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
    res.send(csvContent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/dashboard/export/sponsors
// @desc    Export sponsors as CSV
// @access  Private (admin)
router.get('/export/sponsors', async (req, res) => {
  try {
    const sponsors = await Sponsor.find().populate('sponsoredStudent');
    
    let csvContent = 'Name,Email,Phone,Organization Name,Sponsorship Type,Amount,Payment Date,Payment Status,Sponsored Student,Public Recognition,Newsletter,Created Date\n';
    
    sponsors.forEach(sponsor => {
      const sponsoredStudent = sponsor.sponsoredStudent;
      csvContent += `"${sponsor.name}","${sponsor.email}","${sponsor.phone || ''}","${sponsor.organizationName || ''}","${sponsor.sponsorshipType}","${sponsor.amount}","${sponsor.paymentDate.toDateString()}","${sponsor.paymentStatus}","${sponsoredStudent ? sponsoredStudent.firstName + ' ' + sponsoredStudent.lastName : ''}","${sponsor.publicRecognition}","${sponsor.newsletter}","${sponsor.createdAt.toDateString()}"\n`;
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=sponsors.csv');
    res.send(csvContent);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 