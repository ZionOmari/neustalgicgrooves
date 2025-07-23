# Neustalgic Grooves - Dance Program Website

A full-stack web application for a dance program specializing in breaking and funk styles, built with React, Node.js, Express, MongoDB, and Stripe.

## Features

### Frontend
- **Landing Page**: Hero section with logo, class information, and social media links
- **Student Registration**: Sign-up form with waiver integration
- **Scholarship Application**: Form for parents to apply for financial aid
- **Contact Page**: For nonprofits and sponsors to reach out
- **Gallery**: Photo and video tabs with media management
- **Sponsorship Page**: Options to sponsor students ($100) or buy dance bag kits
- **Private Lessons**: Booking system with Stripe payments ($40/hour)
- **Instructor Bios**: Profiles for Zion, Evil Lynn, and Sockie
- **Class Schedule**: Weekly schedule display
- **Dashboard**: Admin panel for viewing metrics and exporting data

### Backend
- **Student Management**: Track contact info, waivers, attendance, payments
- **Scholarship System**: Application review and approval workflow  
- **Payment Processing**: Stripe integration for lessons and sponsorships
- **Contact Management**: Handle inquiries from nonprofits and sponsors
- **Gallery Management**: File upload and media organization
- **Dashboard Analytics**: Comprehensive metrics and CSV export
- **Data Export**: Export students, scholarships, contacts, and sponsors

## Tech Stack

- **Frontend**: React 18, React Router, Styled Components, Framer Motion, React Hook Form, Stripe React
- **Backend**: Node.js, Express, MongoDB with Mongoose, Stripe API
- **Database**: MongoDB for data persistence
- **Payments**: Stripe for secure payment processing
- **File Uploads**: Multer for gallery media management

## Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB running locally or MongoDB Atlas account
- Stripe account (for payment processing)

### Installation

1. **Clone and Install Dependencies**
   ```bash
   npm run install-deps
   ```

2. **Environment Configuration**
   
   Update `backend/config.env` with your credentials:
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/neustalgic-grooves
   JWT_SECRET=your_secure_jwt_secret_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

   Create `frontend/.env`:
   ```
   REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```
   
   This runs both frontend (http://localhost:3000) and backend (http://localhost:5000) concurrently.

### Individual Commands

- **Backend only**: `npm run server`
- **Frontend only**: `npm run client`
- **Production build**: `npm run build`

## Project Structure

```
neustalgic-grooves/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API endpoints
│   ├── uploads/          # File storage
│   ├── server.js         # Express server
│   └── config.env        # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Main page components
│   │   ├── styles/       # Theme and global styles
│   │   └── App.js        # Main React component
│   └── public/           # Static assets
└── package.json          # Root package.json
```

## Database Models

- **Student**: Personal info, waivers, attendance, payments, scholarships
- **Scholarship**: Application details, review status, award information
- **Contact**: Nonprofit and sponsor inquiries with tracking
- **Sponsor**: Payment information and sponsored student relationships
- **GalleryItem**: Photo and video metadata with file management

## API Endpoints

### Students (`/api/students`)
- `POST /register` - Register new student with waiver
- `GET /` - List all students (admin)
- `GET /:id` - Get student details
- `PUT /:id/first-class` - Mark first class attendance
- `PUT /:id/payment-status` - Update payment status

### Payments (`/api/payments`)
- `POST /create-payment-intent` - Create Stripe payment for lessons
- `POST /create-sponsorship-intent` - Create sponsorship payment
- `POST /webhook` - Handle Stripe webhooks
- `GET /config` - Get Stripe publishable key

### Scholarships (`/api/scholarships`)
- `POST /apply` - Submit scholarship application
- `GET /` - List applications (admin)
- `GET /:id` - Get application details
- `PUT /:id/review` - Review and approve/deny application

### Contacts (`/api/contacts`)
- `POST /` - Submit contact form
- `GET /` - List all contacts (admin)
- `PUT /:id/status` - Update contact status
- `POST /:id/notes` - Add notes to contact

### Gallery (`/api/gallery`)
- `POST /upload` - Upload photos/videos
- `GET /` - List gallery items
- `GET /:id` - Get item details
- `PUT /:id` - Update item metadata
- `DELETE /:id` - Delete item

### Dashboard (`/api/dashboard`)
- `GET /overview` - Get comprehensive statistics
- `GET /analytics/monthly` - Monthly analytics data
- `GET /export/students` - Export students CSV
- `GET /export/scholarships` - Export scholarships CSV
- `GET /export/contacts` - Export contacts CSV
- `GET /export/sponsors` - Export sponsors CSV

## Weekly Schedule

- **Monday**: 
  - Kids Breaking: 5:30-6:30 PM
  - Funk Styles: 6:30-7:30 PM

- **Wednesday**:
  - Adult Breaking: 5:30-6:30 PM  
  - Funk Styles: 6:30-7:30 PM

## Instructors

- **Zion**: Lead instructor specializing in breaking fundamentals
- **Evil Lynn**: Expert in funk styles and performance
- **Sockie**: Advanced power moves and battle preparation

## Payment Options

- **Private Lessons**: $40/hour with Stripe integration
- **Student Sponsorship**: $100 to sponsor a student's classes
- **Dance Bag Kits**: Equipment packages for students

## Scholarship Program

Financial assistance available based on:
- Household income assessment
- Number of dependents
- Essay responses about dance importance
- Review by program administrators

## Contact Information

- **Email**: info@neustalgicgrooves.com
- **Phone**: (555) 123-4567
- **Address**: 123 Dance Street, City, State 12345

## Social Media

- **Instagram**: @neustalgicgrooves
- **Facebook**: /neustalgicgrooves  
- **YouTube**: /neustalgicgrooves

## Contributing

This is a community-focused project. For feature requests or bug reports, please contact the development team.

## License

© 2024 Neustalgic Grooves. All rights reserved.
