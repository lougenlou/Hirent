import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import OwnerDashboard from './pages/owner/OwnerDashboard';
import AddItem from './pages/owner/AddItem';
import OwnerProfile from './pages/owner/OwnerProfile';
import MyListings from './pages/owner/MyListings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Owner Dashboard Routes */}
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/my-listings" element={<MyListings />} />
        <Route path="/owner/add-item" element={<AddItem />} />
        <Route path="/owner/profile" element={<OwnerProfile />} />

        {/* Optional redirect */}
        <Route path="/owner" element={<OwnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
