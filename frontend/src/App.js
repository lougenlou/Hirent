// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

// Owner Dashboard pages
import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddItem from './pages/owner/AddItem';

// Landing Page Component
function LandingPage() {
  return (
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
  );
}

// Main App Component
function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />

        {/* Owner Dashboard Routes - FIXED to match your URL */}
        <Route path="/ownerdashboard" element={<OwnerDashboard />} />
        <Route path="/ownerdashboard/add-item" element={<AddItem />} />
        
        {/* Alternative cleaner routes */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-item" element={<AddItem />} />
      </Routes>
    </Router>
  );
}

export default App;
