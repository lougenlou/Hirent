import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaApple, FaGooglePlay } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">HIRENT</h3>
          <p className="footer-subtitle">Subscribe</p>
          <p className="footer-text">Get 10% off your first order</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>→</button>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Support</h4>
          <ul className="footer-links">
            <li>HiRent Inc.</li>
            <li>Manila, Philippines 1000</li>
            <li>info@hirent.com</li>
            <li>+63 999-888-7777</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Account</h4>
          <ul className="footer-links">
            <li><a href="/account">My Account</a></li>
            <li><a href="/login">Login / Register</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
            <li><a href="/shop">Shop</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Link</h4>
          <ul className="footer-links">
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms Of Use</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Download App</h4>
          <p className="footer-text small">Save $3 with App New User Only</p>
          <div className="app-buttons">
            <button className="app-btn">
              <FaGooglePlay /> Google Play
            </button>
            <button className="app-btn">
              <FaApple /> App Store
            </button>
          </div>
          <div className="social-links">
            <a href="#facebook"><FaFacebook /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#instagram"><FaInstagram /></a>
            <a href="#linkedin"><FaLinkedin /></a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
