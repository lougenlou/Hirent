import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerSignup from "./pages/auth/OwnerSignup";
import OwnerSetup from "./pages/auth/OwnerSetup";
import BrowseRentals from "./pages/home/BrowseRentals";
import MainLayout from "./layouts/MainLayout";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ownersignup" element={<OwnerSignup/>} />
          <Route path="/ownersetup" element={<OwnerSetup />} />

          <Route element={<MainLayout />}>
            <Route path="/browse" element={<BrowseRentals />} />
            <Route path="/about" element={<div></div>} />
            <Route path="/how-it-works" element={<div></div>} />
            <Route path="/wishlist" element={<div></div>} />
            <Route path="/cart" element={<div></div>} />
            <Route path="/profile" element={<div></div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
