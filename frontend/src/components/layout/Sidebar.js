import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// External URLs for "Add", "Earnings", and "Logout" icons
const AddIcon = "https://cdn-icons-png.flaticon.com/128/3914/3914337.png";
const AddIconActive = "/assets/icons/add1.png";
const EarningsIcon = "https://cdn-icons-png.flaticon.com/128/3916/3916701.png";
const LogoutIcon = "https://cdn-icons-png.flaticon.com/128/5528/5528185.png";

// Local imports for other icons
const DashboardIcon = "/assets/icons/dashboardb.png";
const DashboardIconActive = "/assets/icons/dashboard.png";
const ListingsIcon = "/assets/icons/listing.png";
const BookingsIcon = "/assets/icons/bookings.png";
const ProfileIcon = "/assets/icons/profile.png";

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
    iconActive: ListingsIcon,
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
    iconActive: BookingsIcon,
    path: "/ownerdashboard/bookings"
  },
  { 
    label: "Earnings", 
    icon: EarningsIcon,
    iconActive: EarningsIcon,
    path: "/ownerdashboard/earnings"
  },
  { 
    label: "Profile", 
    icon: ProfileIcon,
    iconActive: ProfileIcon,
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
    <aside className="h-screen w-64 bg-white border-r flex flex-col fixed left-0 top-0">
      {/* Logo section */}
      <div className="px-6 py-6 border-b mb-4 flex flex-col items-start flex-shrink-0">
        <img
          src="/assets/icons/owner_logo.png"
          alt="Owner Logo"
          className="h-16 mb-2"
          style={{ objectFit: "contain" }}
        />
        <span className="block text-xs text-gray-500 mt-1 ml-3">Owner Dashboard</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2 flex-1 overflow-y-auto">
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
      <div className="px-2 pb-6 flex-shrink-0">
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
