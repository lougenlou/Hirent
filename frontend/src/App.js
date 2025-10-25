import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Landing page components
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import BrowseItems from './components/BrowseItems';
import HowItWorks from './components/HowItWorks';
import WhyChoose from './components/WhyChoose';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// Dashboard pages
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import AddItemPage from './pages/AddItemPage';  // ← Make sure this is imported

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

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Owner Dashboard */}
        <Route path="/ownerdashboard" element={<OwnerDashboardPage />} />
        <Route path="/ownerdashboard/add-item" element={<AddItemPage />} />  {/* ← Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
