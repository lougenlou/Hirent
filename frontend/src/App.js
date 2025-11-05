import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import FeaturedCategories from "./components/home/FeaturedCategories";
import BrowseItems from "./components/items/BrowseItems";
import HowItWorks from "./components/home/HowItWorks";
import WhyChoose from "./components/home/WhyChoose";
import Testimonials from "./components/home/Testimonials";

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

// Owner Registration Pages
import OwnerInformation from "./pages/owners/Owner_Information";
import OwnerSubmission from "./pages/owners/Owner_Submission";

// Owner Dashboard Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import OwnerProfile from "./pages/owner/OwnerProfile";

import OwnerInformation from "./pages/owners/Owner_Information";
import OwnerSubmission from "./pages/owners/Owner_Submission";

// Layout components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Owner Registration */}
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />

        {/* Owner Dashboard */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />

      </Routes>
    </Router>
  );
}

export default App;