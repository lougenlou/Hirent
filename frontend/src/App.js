import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import Booking from './pages/Booking';

// Import the new pages
import BookingSuccessPage from './pages/BookingSuccess';
import BookingFailurePage from './pages/BookingFailure';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* NAVBAR */}
        <Navbar />

        {/* MAIN LAYOUT: SIDEBAR + CONTENT */}
        <div className="flex flex-1">
          {/* SIDEBAR */}
          <Sidebar />

          {/* CONTENT AREA with left padding for spacing */}
          <div className="flex-1 pl-6 pr-6 md:pl-10 md:pr-10 pb-12 overflow-x-hidden">
            <Routes>
              <Route path="/booking" element={<Booking />} />
              
              {/* NEW ROUTES ADDED HERE */}
              <Route path="/booking-success" element={<BookingSuccessPage />} />
              <Route path="/booking-failure" element={<BookingFailurePage />} />
            </Routes>
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
