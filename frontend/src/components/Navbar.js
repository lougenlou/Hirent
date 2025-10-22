import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nb-nav">
      <div className="nb-container">
        {/* Logo image (bigger) */}
        <Link to="/" className="nb-logo-imgwrap" aria-label="HiRent Home">
          <img
            src={`${process.env.PUBLIC_URL}/hirent.png`}
            alt="HiRent Logo"
            className="navbar-logo-img"
          />
        </Link>

        <ul className="nb-menu">
          <li><Link to="/" className="nb-link">Home</Link></li>
          <li><Link to="/browse" className="nb-link">Browse</Link></li>
          <li><Link to="/how-it-works" className="nb-link">How It Works</Link></li>
          <li><Link to="/about" className="nb-link">About Us</Link></li>
          <li><Link to="/be-a-seller" className="nb-link nb-seller">Be A Seller</Link></li>
        </ul>

        <div className="nb-btns">
          <button className="nb-login">Login</button>
          <button className="nb-register">Register</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
