import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import GlobalStyles from './styles/GlobalStyles';
import theme from './styles/theme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Scholarship from './pages/Scholarship';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Sponsorship from './pages/Sponsorship';
import PrivateLessons from './pages/PrivateLessons';
import Dashboard from './pages/Dashboard';
import Instructors from './pages/Instructors';
import Schedule from './pages/Schedule';

// Initialize Stripe
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <GlobalStyles />
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/scholarship" element={<Scholarship />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/private-lessons" element={<PrivateLessons />} />
                <Route path="/instructors" element={<Instructors />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/dashboard/*" element={<Dashboard />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Elements>
    </ThemeProvider>
  );
}

export default App; 