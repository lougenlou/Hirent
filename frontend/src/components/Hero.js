import React from 'react';
import './Hero.css';

const Hero = () => {
  // Soft white glow from left + purple sweep
  const bgStyle = {
    background: `
      radial-gradient(1200px 520px at 260px 260px, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.75) 32%, rgba(255,255,255,0.25) 58%, rgba(255,255,255,0) 72%),
      linear-gradient(115deg, #7b2cbf 0%, #9551e9 40%, #b37cf6 70%, #c79bff 100%)
    `
  };

  return (
    <section className="hero" style={bgStyle}>
      <div className="hero-wrap">
        <div className="hero-left">
          <h1 className="hero-title">
            Rent What You Need.<br />
            Earn From What You Don't.
          </h1>

          <p className="hero-desc">
            Save money, reduce waste, and join the sharing economy with HIRENT.<br />
            Discover thousands of items available for rent near you.
          </p>

          <div className="hero-actions">
            <button className="btn-primary">
              Explore Rentals <span className="arrow">→</span>
            </button>
            <button className="btn-white">Learn More</button>
          </div>

          <div className="hero-stats">
            <div className="stat">
              <div className="num">10,000+</div>
              <div className="label">Items Listed</div>
            </div>
            <div className="stat">
              <div className="num">5,000+</div>
              <div className="label">Active Users</div>
            </div>
            <div className="stat">
              <div className="num">99%</div>
              <div className="label">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <img
            src={`${process.env.PUBLIC_URL}/girl.png`}
            alt="HiRent Girl"
            className="hero-girl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
