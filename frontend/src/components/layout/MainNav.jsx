
import React from 'react';
import hirentLogo from "../assets/hirent-logo.png";

const MainNavbar = () => {
  return React.createElement(
    'nav',
    { className: 'px-6 md:px-16 lg:px-24 py-3.5', style: { backgroundColor: '#7A1CA9' } },
    React.createElement(
      'div',
      { className: 'flex items-center justify-between max-w-7xl mx-auto' },

      React.createElement(
        'div',
        { className: 'flex items-center' },
        React.createElement('img', {
          src: hirentLogo,
          alt: 'Hirent',
          className: 'h-12'
        })
      ),

      React.createElement(
        'div',
        { className: 'hidden md:flex items-center space-x-8 font-inter text-sm' },
        React.createElement('a', { href: '#home', className: 'text-white hover:text-gray-200 transition' }, 'Home'),
        React.createElement('a', { href: '#browse', className: 'text-white hover:text-gray-200 transition' }, 'Browse'),
        React.createElement('a', { href: '#how-it-works', className: 'text-white hover:text-gray-200 transition' }, 'How It Works'),
        React.createElement('a', { href: '#about', className: 'text-white hover:text-gray-200 transition' }, 'About Us'),
        React.createElement('a', { href: '#seller', className: 'hover:opacity-80 transition underline', style: { color: '#FFFB83' } }, 'Be A Seller')
      ),

      React.createElement(
        'div',
        { className: 'flex items-center space-x-3' },
        React.createElement(
          'button',
          {
            className: 'px-6 py-2 bg-transparent border-2 border-white text-white rounded-md font-inter font-semibold hover:bg-white transition text-sm',
            onMouseEnter: (e) => e.currentTarget.style.color = '#7A1CA9',
            onMouseLeave: (e) => e.currentTarget.style.color = '#ffffff'
          },
          'Login'
        ),
        React.createElement(
          'button',
          {
            className: 'px-6 py-2 bg-white rounded-md font-inter font-semibold hover:bg-gray-100 transition text-sm',
            style: { color: '#743593' }
          },
          'Register'
        )
      )

    )
  );
};

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
    { name: "Be A Seller", path: "/seller", highlight: true },
  ];


  return (
    <>
      {/* ✅ Fixed Navbar */}
      <nav
        className="px-6 md:px-16 lg:px-24 fixed top-0 left-0 w-full z-50 shadow-sm"
        style={{ backgroundColor: "#7A1CA9", height: "55px" }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto h-full">


          {/* ✅ Logo */}
          <div className="flex items-center h-full cursor-pointer" onClick={() => navigate("/")}>
            <img src={hirentLogo} alt="HiRENT" className="h-7" />
          </div>


          {/* ✅ Navigation Links (highlight same as Navbar) */}
          <div className="hidden md:flex items-stretch h-full font-inter text-[13px]">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={`flex items-center justify-center px-5 h-full transition-colors ${
                    isActive
                      ? "bg-[#59087f] border-b-[4px] border-white"
                      : "hover:bg-[#680e91]"
                  } ${link.highlight ? "text-[#FFFB83] font-semibold" : "text-white"}`}
                  style={{
                    margin: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  {link.name}
                </NavLink>
              );
            })}
          </div>


          {/* ✅ Buttons (Login / Register) */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/login")}
              className="w-20 h-8 bg-white/5 border border-white/70 text-white rounded-md font-inter font-semibold hover:bg-white/20 transition text-[13px]"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="w-24 h-8 bg-white rounded-md font-inter font-semibold hover:bg-gray-100 transition text-[13px]"
              style={{ color: "#743593" }}
            >
              Register
            </button>
          </div>
        </div>
      </nav>


      {/* Spacer so content isn't hidden */}
    </>
  );
};

export default MainNavbar;

