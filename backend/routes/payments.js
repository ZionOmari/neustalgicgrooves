const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Student = require('../models/Student');
const Sponsor = require('../models/Sponsor');

// @route   POST /api/payments/create-payment-intent
// @desc    Create payment intent for private lessons
// @access  Public
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', studentId, lessonDate, lessonTime } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: {
        studentId,
        lessonDate,
        lessonTime,
        type: 'private-lesson'
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Payment intent creation failed' });
  }
});

// @route   POST /api/payments/create-sponsorship-intent
// @desc    Create payment intent for sponsorships
// @access  Public
router.post('/create-sponsorship-intent', async (req, res) => {
  try {
    const { 
      amount, 
      currency = 'usd', 
      sponsorshipType, 
      sponsorInfo,
      studentId 
    } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      metadata: {
        sponsorshipType,
        sponsorEmail: sponsorInfo.email,
        sponsorName: sponsorInfo.name,
        studentId: studentId || '',
        type: 'sponsorship'
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Sponsorship payment intent creation failed' });
  }
});

// @route   POST /api/payments/webhook
// @desc    Handle Stripe webhooks
// @access  Public (Stripe)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handleSuccessfulPayment(paymentIntent);
      break;
    
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      await handleFailedPayment(failedPayment);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
});

// Helper function to handle successful payments
async function handleSuccessfulPayment(paymentIntent) {
  try {
    const { metadata } = paymentIntent;

    if (metadata.type === 'private-lesson') {
      // Update student payment record
      if (metadata.studentId) {
        await Student.findByIdAndUpdate(metadata.studentId, {
          $push: {
            paymentHistory: {
              amount: paymentIntent.amount / 100,
              date: new Date(),
              stripePaymentId: paymentIntent.id,
              description: `Private lesson - ${metadata.lessonDate} ${metadata.lessonTime}`
            }
          },
          paymentStatus: 'paid'
        });
      }
    } else if (metadata.type === 'sponsorship') {
      // Create sponsor record
      const sponsor = new Sponsor({
        name: metadata.sponsorName,
        email: metadata.sponsorEmail,
        sponsorshipType: metadata.sponsorshipType,
        amount: paymentIntent.amount / 100,
        stripePaymentId: paymentIntent.id,
        paymentStatus: 'completed',
        sponsoredStudent: metadata.studentId || null
      });

      await sponsor.save();

      // If sponsoring a specific student, update the student record
      if (metadata.studentId && metadata.sponsorshipType === 'student-sponsor') {
        await Student.findByIdAndUpdate(metadata.studentId, {
          sponsor: sponsor._id,
          scholarshipStatus: 'approved',
          scholarshipAmount: paymentIntent.amount / 100
        });
      }
    }

    console.log('Payment processed successfully:', paymentIntent.id);
  } catch (error) {
    console.error('Error processing successful payment:', error);
  }
}

// Helper function to handle failed payments
async function handleFailedPayment(paymentIntent) {
  try {
    console.log('Payment failed:', paymentIntent.id);
    
    // Update sponsor record if it exists
    if (paymentIntent.metadata.type === 'sponsorship') {
      await Sponsor.findOneAndUpdate(
        { stripePaymentId: paymentIntent.id },
        { paymentStatus: 'failed' }
      );
    }
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
}

// @route   GET /api/payments/config
// @desc    Get Stripe publishable key
// @access  Public
router.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

module.exports = router; 