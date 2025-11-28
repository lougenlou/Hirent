import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import hirentLogo from "../assets/hirent-logo.png";

const MainNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Browse", path: "/browse" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About Us", path: "/about" },
  ];

  return (
    <>
      <nav
        className="px-6 md:px-16 lg:px-24 fixed top-0 left-0 w-full z-50 shadow-sm"
        style={{ backgroundColor: "#7A1CA9", height: "55px" }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto h-full">

          {/* Logo */}
          <div
            className="flex items-center h-full cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={hirentLogo} alt="HiRENT" className="h-7" />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-stretch h-full font-inter text-[13px]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-center px-5 h-full transition-colors ${
                    isActive
                      ? "bg-[#59087f] text-white border-b-[4px] border-white"
                      : "text-white hover:bg-[#680e91]"
                  }`}
                >
                  {link.name}
                </NavLink>
              );
            })}

            {/* “Be an Owner” */}
            <NavLink
              to="/ownersignup"
              className="flex items-center justify-center px-5 h-full transition-colors"
              style={{ color: "#FFFB83" }}
            >
              <span className="underline underline-offset-2 hover:decoration-yellow-400 hover:text-yellow-300 transition-all">
                Be an Owner
              </span>
            </NavLink>
          </div>

          {/* Right side actions (Profile, Notification, Logout) */}
          <div className="flex items-center space-x-4 text-white">

            {/* Notification Icon */}
            <button
              className="relative hover:opacity-80 transition"
              onClick={() => navigate("/notifications")}
            >
              {/* Bell Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 10V6a4 4 0 10-8 0v4a2 2 0 01-.894 1.789l-.553.395A2 2 0 005 16h10a2 2 0 001.447-3.816l-.553-.395A2 2 0 0114 10z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 20a2 2 0 002-2H8a2 2 0 002 2z"
                />
              </svg>

              {/* Notification Badge (optional) */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] text-white w-4 h-4 flex justify-center items-center rounded-full">
                3
              </span>
            </button>

            {/* Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              className="text-sm font-semibold hover:text-gray-200 transition"
            >
              Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={() => navigate("/logout")}
              className="text-sm font-semibold hover:text-gray-200 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
