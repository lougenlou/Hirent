import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import OwnerInformation from "./pages/owners/Owner_Information";
import OwnerSubmission from "./pages/owners/Owner_Submission";
import Onboarding1 from "./pages/onboarding/Onboarding1";
import Onboarding2 from "./pages/onboarding/Onboarding2";
import Onboarding3 from "./pages/onboarding/Onboarding3";
import Onboarding4 from "./pages/onboarding/Onboarding4";
import OnboardingLayout from "./layouts/OnboardingLayout";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Regular routes */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />

        {/* ✅ NESTED ROUTES FOR ONBOARDING */}
        <Route element={<OnboardingLayout />}>
          <Route path="/onboarding1" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />
          <Route path="/onboarding4" element={<Onboarding4 />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
