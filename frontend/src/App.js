// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Owner Pages
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import AddItem from "./pages/owner/AddItem";
import OwnerProfile from "./pages/owner/OwnerProfile";
import MyListings from "./pages/owner/MyListings";
import OwnerEarnings from "./pages/owner/OwnerEarnings";
import OwnerReturns from "./pages/owner/OwnerReturns";
import OwnerSettings from "./pages/owner/OwnerSettings";
import OwnerBookings from "./pages/owner/OwnerBookings";

function App() {
  return (
    <Router>
      <Routes>

        {/* ---------------------------- */}
        {/*        OWNER ROUTES         */}
        {/* ---------------------------- */}

        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/my-listings" element={<MyListings />} />
        <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/bookings" element={<OwnerBookings />} />
        <Route path="/owner/returns" element={<OwnerReturns />} />
        <Route path="/owner/earnings" element={<OwnerEarnings />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />
        <Route path="/owner/settings" element={<OwnerSettings />} />

        {/* Default redirect for /owner */}
        <Route path="/owner" element={<OwnerDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
