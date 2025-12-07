// src/pages/owner/OwnerSettings.jsx
import React, { useState } from "react";
import OwnerSidebar from "../../components/layouts/OwnerSidebar";
import {
  Bell,
  Shield,
  Globe,
  CreditCard,
  Eye,
  EyeOff,
  Moon,
  Sun,
  Smartphone,
  Lock,
  Key,
  ChevronRight,
  Check,
} from "lucide-react";

const OwnerSettings = () => {
  // States for settings
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("notifications");
  const [savedMessage, setSavedMessage] = useState("");

  const handleSave = () => {
    setSavedMessage("Settings saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  const ToggleSwitch = ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
          enabled ? "bg-[#7A1CA9]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
            enabled ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
    { id: "payment", label: "Payment", icon: CreditCard },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />

      <main className="flex-1 p-8 ml-60">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Success Message */}
        {savedMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fadeIn">
            <Check className="w-5 h-5 text-green-600" />
            <span className="text-green-700 text-sm font-medium">
              {savedMessage}
            </span>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-[#7A1CA9] text-white shadow-md"
                  : "text-gray-600 hover:bg-purple-50 hover:text-[#7A1CA9]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Bell className="w-5 h-5 text-[#7A1CA9]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Notification Settings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Control how you receive notifications
                  </p>
                </div>
              </div>

              <ToggleSwitch
                enabled={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
                label="Email Notifications"
                description="Receive notifications via email"
              />
              <ToggleSwitch
                enabled={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
                label="Push Notifications"
                description="Browser push notifications"
              />
              <ToggleSwitch
                enabled={bookingAlerts}
                onChange={() => setBookingAlerts(!bookingAlerts)}
                label="Booking Alerts"
                description="Get notified for new bookings and requests"
              />
              <ToggleSwitch
                enabled={paymentAlerts}
                onChange={() => setPaymentAlerts(!paymentAlerts)}
                label="Payment Alerts"
                description="Receive payment and earnings notifications"
              />
              <ToggleSwitch
                enabled={marketingEmails}
                onChange={() => setMarketingEmails(!marketingEmails)}
                label="Marketing Emails"
                description="Receive tips, updates, and promotional content"
              />
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="w-5 h-5 text-[#7A1CA9]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Security Settings
                  </h2>
                  <p className="text-sm text-gray-500">Protect your account</p>
                </div>
              </div>

              {/* Change Password */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Lock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-800">
                    Change Password
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Current Password"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9] focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-[#7A1CA9] text-white text-sm rounded-lg hover:bg-[#6a1894] transition">
                    Update Password
                  </button>
                </div>
              </div>

              {/* Two-Factor Authentication */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <ToggleSwitch
                  enabled={twoFactorAuth}
                  onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                  label="Two-Factor Authentication"
                  description="Add an extra layer of security to your account"
                />
                {twoFactorAuth && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2 text-[#7A1CA9]">
                      <Key className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        2FA is enabled
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      You&apos;ll receive a code when logging in
                    </p>
                  </div>
                )}
              </div>

              {/* Login History */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                    <div>
                      <span className="font-medium text-gray-800">
                        Active Sessions
                      </span>
                      <p className="text-xs text-gray-500">
                        Manage devices logged into your account
                      </p>
                    </div>
                  </div>
                  <button className="text-[#7A1CA9] text-sm font-medium hover:underline flex items-center gap-1">
                    View All <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="w-5 h-5 text-[#7A1CA9]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    App Preferences
                  </h2>
                  <p className="text-sm text-gray-500">
                    Customize your experience
                  </p>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-gray-600" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    )}
                    <div>
                      <span className="font-medium text-gray-800">
                        Dark Mode
                      </span>
                      <p className="text-xs text-gray-500">
                        Switch between light and dark theme
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                      darkMode ? "bg-[#7A1CA9]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 ${
                        darkMode ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Language */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Language
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9]">
                  <option>English</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                </select>
              </div>

              {/* Currency */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Currency
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9]">
                  <option>PHP - Philippine Peso</option>
                  <option>USD - US Dollar</option>
                  <option>EUR - Euro</option>
                </select>
              </div>

              {/* Timezone */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Timezone
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9]">
                  <option>Asia/Manila (GMT+8)</option>
                  <option>Asia/Singapore (GMT+8)</option>
                  <option>America/New_York (GMT-5)</option>
                </select>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === "payment" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CreditCard className="w-5 h-5 text-[#7A1CA9]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Payment Settings
                  </h2>
                  <p className="text-sm text-gray-500">
                    Manage your payment methods
                  </p>
                </div>
              </div>

              {/* Payout Method */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-800 mb-3">
                  Payout Method
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#7A1CA9] transition">
                    <input
                      type="radio"
                      name="payout"
                      className="accent-[#7A1CA9]"
                      defaultChecked
                    />
                    <span className="text-sm">
                      Bank Transfer (BPI, BDO, PNB)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#7A1CA9] transition">
                    <input
                      type="radio"
                      name="payout"
                      className="accent-[#7A1CA9]"
                    />
                    <span className="text-sm">GCash</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-[#7A1CA9] transition">
                    <input
                      type="radio"
                      name="payout"
                      className="accent-[#7A1CA9]"
                    />
                    <span className="text-sm">Maya (PayMaya)</span>
                  </label>
                </div>
              </div>

              {/* Auto Payout */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <ToggleSwitch
                  enabled={true}
                  onChange={() => {}}
                  label="Automatic Payouts"
                  description="Automatically transfer earnings to your preferred method"
                />
              </div>

              {/* Minimum Payout */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Minimum Payout Threshold
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#7A1CA9]">
                  <option>₱500</option>
                  <option>₱1,000</option>
                  <option>₱2,500</option>
                  <option>₱5,000</option>
                </select>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#7A1CA9] text-white text-sm font-medium rounded-xl hover:bg-[#6a1894] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerSettings;
