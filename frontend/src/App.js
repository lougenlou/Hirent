import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./signup/Signup";
import Login from "./login/Login";
import OwnerInformation from "./users/owners/Owner_Information";
import OwnerSubmission from "./users/owners/Owner_Submission";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/owner-information" element={<OwnerInformation />} />
        <Route path="/owner-submission" element={<OwnerSubmission />} />
      </Routes>
    </Router>
  );
}

export default App;
