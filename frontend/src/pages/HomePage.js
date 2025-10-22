import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCategories from '../components/FeaturedCategories';
import BrowseItems from '../components/BrowseItems';
import HowItWorks from '../components/HowItWorks';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <Hero />
      {/* Stats removed - now inside Hero */}
      <FeaturedCategories />
      <BrowseItems />
      <HowItWorks />
      <WhyChoose />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default HomePage;
