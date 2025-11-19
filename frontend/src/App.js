import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from './components/layout/Sidebar';
import OwnerBookingsDashboard from './pages/OwnerBookingsDashboard';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        {/* Add ml-64 to offset sidebar width for correct layout */}
        <main className="flex-1 ml-64">
          <Routes>
            <Route path="/owner/bookings" element={<OwnerBookingsDashboard />} />
            {/* You may add more routes as needed here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
