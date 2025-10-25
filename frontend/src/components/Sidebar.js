import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// External URLs for "Add", "Earnings", and "Logout" icons
const AddIcon = "https://cdn-icons-png.flaticon.com/128/3914/3914337.png";
const AddIconActive = "/icons/add1.png"; // Active state icon
const EarningsIcon = "https://cdn-icons-png.flaticon.com/128/3916/3916701.png";
const LogoutIcon = "https://cdn-icons-png.flaticon.com/128/5528/5528185.png";

// Local imports for other icons
const DashboardIcon = "/icons/dashboardb.png";
const DashboardIconActive = "/icons/dashboard.png"; // Active state icon
const ListingsIcon = "/icons/listing.png";
const BookingsIcon = "/icons/bookings.png";
const ProfileIcon = "/icons/profile.png";

const items = [
  { 
    label: "Dashboard", 
    icon: DashboardIcon,
    iconActive: DashboardIconActive,
    path: "/ownerdashboard"
  },
  { 
    label: "My Listings", 
    icon: ListingsIcon,
    iconActive: ListingsIcon, // Use same icon if no active version
    path: "/ownerdashboard/listings"
  },
  { 
    label: "Add Item", 
    icon: AddIcon,
    iconActive: AddIconActive,
    path: "/ownerdashboard/add-item"
  },
  { 
    label: "Bookings", 
    icon: BookingsIcon,
    iconActive: BookingsIcon, // Use same icon if no active version
    path: "/ownerdashboard/bookings"
  },
  { 
    label: "Earnings", 
    icon: EarningsIcon,
    iconActive: EarningsIcon, // Use same icon if no active version
    path: "/ownerdashboard/earnings"
  },
  { 
    label: "Profile", 
    icon: ProfileIcon,
    iconActive: ProfileIcon, // Use same icon if no active version
    path: "/ownerdashboard/profile"
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <aside className="h-screen w-64 bg-white border-r flex flex-col overflow-hidden">
      {/* Logo section */}
      <div className="px-6 py-6 border-b mb-4 flex flex-col items-start">
        <img
          src="/icons/owner_logo.png"
          alt="Owner Logo"
          className="h-16 mb-2"
          style={{ objectFit: "contain" }}
        />
        <span className="block text-xs text-gray-500 mt-1 ml-3">Owner Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm w-full text-left
                ${isActive ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-gray-100"}
                transition`}
              tabIndex={0}
            >
              <span className="w-5 h-5 text-lg">
                <img 
                  src={isActive ? item.iconActive : item.icon} 
                  alt={item.label} 
                  className="w-5 h-5" 
                />
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="mt-auto px-2 pb-6">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-500 px-4 py-2 rounded transition text-sm w-full"
        >
          <img 
            src={LogoutIcon} 
            alt="Logout" 
            className="w-5 h-5 transform rotate-180"
          />
          Logout
        </button>
      </div>
    </aside>
  );
}
