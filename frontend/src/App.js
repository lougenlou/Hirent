import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails';
import './App.css';
import "leaflet/dist/leaflet.css";

// Public Components
import Navbar from "./components/MainNav";
import Footer from "./components/Footer";
import HeroSection from "./components/home/HeroSection";
import FeaturedCategories from "./components/home/FeaturedCategories";
import BrowseItems from "./components/items/BrowseItems";
import HowItWorks from "./components/home/HowItWorks";
import WhyChoose from "./components/home/WhyChoose";
import Testimonials from "./components/home/Testimonials";
// Layout components
import Navbar from './components/layout/MainNav';
import Footer from './components/layout/Footer';

// Auth Pages
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

// Owner Registration Pages
import OwnerInformation from "./pages/auth/Owner_Information";
import OwnerSubmission from "./pages/auth/Owner_Submission";

// Owner Dashboard Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import OwnerProfile from "./pages/owner/OwnerProfile";

import Onboarding1 from "./pages/onboarding/Onboarding1";
import Onboarding2 from "./pages/onboarding/Onboarding2";
import Onboarding3 from "./pages/onboarding/Onboarding3";
import Onboarding4 from "./pages/onboarding/Onboarding4";
import OnboardingLayout from "./layouts/OnboardingLayout";

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
        {/* Product Details Route */}
        <Route path="/product/:id" element={<ProductDetails />} />
        

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Owner Registration */}
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />

        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/onboarding4" element={<Onboarding4 />} />
        </Route>
        {/* Owner Dashboard */}
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />

      </Routes>
    </Router>
  );
}

export default App;