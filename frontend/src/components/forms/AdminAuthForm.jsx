import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminBg from "../../assets/admin-bg.jpg";
import adminLogo from "../../assets/hirent-logo.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AdminAuthForm = ({ mode }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminKey: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required fields
    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    // Optional extra security field for signup
    if (mode === "signup" && formData.adminKey.trim().length < 6) {
      setError("Admin Key must be at least 6 characters.");
      return;
    }

    setError("");

    console.log(`ADMIN ${mode} data:`, formData);

    // redirect to admin dashboard
    navigate("/admin/dashboard");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${adminBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      {/* USER VIEW LINK — TOP RIGHT */}
      <div className="absolute top-4 right-4">
        <Link
          to="/login"
          className="text-purple-400 underline hover:text-purple-300 text-sm font-medium"
        >
          User View
        </Link>
      </div>

      {/* Auth Card */}
      <div className="relative z-10 w-[400px] bg-[#120e14] rounded-3xl shadow-xl p-8 text-white">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={adminLogo} alt="Admin" className="w-16 mb-2 opacity-90" />
          <h2 className="text-2xl font-bold tracking-wide">
            {mode === "signup" ? "Admin Registration" : "Admin Login"}
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            {mode === "signup"
              ? "Create an admin account"
              : "Access the admin dashboard"}
          </p>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-3 bg-[#1b1c1f] border border-gray-700 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full mt-1 px-3 py-3 mb-2 bg-[#1b1c1f] border border-gray-700 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 outline-none transition"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Toggle */}
            {formData.password.length > 0 && (
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] cursor-pointer text-gray-400 hover:text-purple-400"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </span>
            )}
          </div>

          {/* ADMIN KEY — SIGNUP ONLY */}
          {mode === "signup" && (
            <div>
              <label className="text-sm text-gray-300">Admin Key</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-3 bg-[#1b1c1f] border border-gray-700 rounded-md text-sm focus:border-purple-500 focus:ring-purple-500 outline-none transition"
                placeholder="Enter Admin Access Key"
                value={formData.adminKey}
                onChange={(e) =>
                  setFormData({ ...formData, adminKey: e.target.value })
                }
              />
            </div>
          )}

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition rounded-md text-sm font-medium"
          >
            {mode === "signup" ? "Create Admin Account" : "Login as Admin"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {mode === "signup"
            ? "Already have an admin account?"
            : "No admin account yet?"}{" "}
          <Link
            to={mode === "signup" ? "/admin-login" : "/admin-signup"}
            className="text-purple-400 hover:underline"
          >
            {mode === "signup" ? "Login" : "Register"}
          </Link>
        </p>

        <div className="flex justify-center gap-4 text-[11px] text-gray-500 mt-5">
          <span className="hover:text-gray-300 cursor-pointer">Help</span>
          <span className="hover:text-gray-300 cursor-pointer">Privacy</span>
          <span className="hover:text-gray-300 cursor-pointer">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthForm;
