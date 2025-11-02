<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerInformation from "./pages/owners/Owner_Information";
import OwnerSubmission from "./pages/owners/Owner_Submission";
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> fb5b9551f50f26dd278c1ec027b4cfebe2206411

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Landing page components
import HeroSection from './components/home/HeroSection';
import FeaturedCategories from './components/home/FeaturedCategories';
import HowItWorks from './components/home/HowItWorks';
import WhyChoose from './components/home/WhyChoose';
import Testimonials from './components/home/Testimonials';
import BrowseItems from './components/items/BrowseItems';

// Landing Page Component
function LandingPage() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />
      </Routes>
    </Router>
=======
    <div className="App">
      <Navbar />
      <HeroSection />
      <FeaturedCategories />
      <BrowseItems />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
>>>>>>> fb5b9551f50f26dd278c1ec027b4cfebe2206411
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
