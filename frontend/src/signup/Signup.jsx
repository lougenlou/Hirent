import React, { useState } from "react";
import "../assets/Auth.css";
import bgImage from "../assets/bg-signup.jpg";
import Footer from "../components/Footer";
import hirentLogo from "../assets/hirent-logo.png";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    navigate("/owner-information");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div
        className="flex flex-col min-h-screen items-center justify-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "white",
        }}
      >
        <div className="absolute top-6 left-6">
          <img src={hirentLogo} alt="Hirent Logo" className="w-24 h-auto mb-3" />
        </div>

        <div className="z-10 bg-white w-100 md:w-[350px] lg:w-[420px] h-[520px] rounded-lg shadow-lg p-10 flex flex-col justify-center hover:shadow-2xl hover:scale-105 transition-all duration-300">

          <h2 className="text-[24px] font-bold text-gray-900 mb-1 text-center">
            Create an account
          </h2>


          <p className="text-[15px] text-gray-600 mb-8 text-center">
            Enter your details below
          </p>


          <form className="space-y-6" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-[95%] mx-auto block border-b border-gray-300 focus:outline-none focus:border-purple-600 pb-2 text-[15px]"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-[95%] mx-auto block border-b border-gray-300 focus:outline-none focus:border-purple-600 pb-2 text-[15px]"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-[95%] mx-auto block border-b border-gray-300 focus:outline-none focus:border-purple-600 pb-2 text-[15px]"
            />

            <div className="flex flex-col gap-3 mt-2">
              <button
                type="submit"
                className="w-[95%] mx-auto bg-purple-800 text-white py-3 text-[15px] rounded-md hover:bg-purple-600 transition-all"
              >
                Create Account
              </button>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="button"
                className="w-[95%] mx-auto border border-gray-400 flex items-center justify-center gap-2 py-3 text-[15px] rounded-md text-gray-700 hover:border-purple-600 hover:bg-gray-50 transition-all"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Sign up with Google
              </button>
            </div>
          </form>

          <p className="text-[15px] text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
