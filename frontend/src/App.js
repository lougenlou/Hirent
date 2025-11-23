import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Navbar from './components/layout/MainNav';
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
      </Routes>
    </Router>
  );
}

export default App;
