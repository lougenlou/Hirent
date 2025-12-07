import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Moon,
  Sun,
  Shield,
  UserCog,
  Bell,
  Lock,
  Save,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminSettings() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [adminName, setAdminName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    console.log("Saved settings:", {
      darkMode,
      notifications,
      adminName,
      email,
    });
    alert("Settings saved successfully.");
  };

  return (
    <div className="min-h-screen bg-[#0d0b11] text-white p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-[#1a1a22] hover:bg-[#25252e] transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold tracking-wide">Admin Settings</h1>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PROFILE SETTINGS */}
        <div className="bg-[#14121a] p-6 rounded-2xl shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <UserCog className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold">Profile Settings</h2>
          </div>

          <label className="text-sm text-gray-300">Admin Name</label>
          <input
            type="text"
            className="w-full mt-1 mb-4 px-3 py-3 bg-[#1d1b22] border border-gray-700 rounded-lg text-sm focus:border-purple-500 outline-none"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />

          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            className="w-full mt-1 mb-4 px-3 py-3 bg-[#1d1b22] border border-gray-700 rounded-lg text-sm focus:border-purple-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="text-sm text-gray-300">Change Password</label>
          <input
            type="password"
            className="w-full mt-1 px-3 py-3 bg-[#1d1b22] border border-gray-700 rounded-lg text-sm focus:border-purple-500 outline-none"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* APP SETTINGS */}
        <div className="bg-[#14121a] p-6 rounded-2xl shadow-xl border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold">App Preferences</h2>
          </div>

          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-4 p-3 bg-[#1a1820] rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <Moon className="w-5 h-5 text-purple-300" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-300" />
              )}
              <span className="text-sm">Dark Mode</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-600 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
            </label>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#1a1820] rounded-lg border border-white/5">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-purple-300" />
              <span className="text-sm">Notifications</span>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />
              <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:bg-purple-600 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
            </label>
          </div>
        </div>
      </div>

      {/* SECURITY SECTION */}
      <div className="mt-8 bg-[#14121a] p-6 rounded-2xl shadow-xl border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-semibold">Security</h2>
        </div>

        <p className="text-gray-400 text-sm mb-3">
          Manage access controls and sensitive admin operations.
        </p>

        <div className="flex gap-4">
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-sm">
            Reset Admin Key
          </button>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm">
            View Access Logs
          </button>
          <Link to="/admin-login">
            <button className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm">
              Logout
            </button>
          </Link>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div className="flex justify-end mt-10">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg transition text-sm font-medium"
        >
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>
    </div>
  );
}
