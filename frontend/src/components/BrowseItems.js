import React from 'react';
import { FaStar, FaHeart, FaEye } from 'react-icons/fa';
import './BrowseItems.css';

const BrowseItems = () => {
  const products = [
    {
      id: 1,
      name: 'Gucci duffle bag',
      price: 960,
      oldPrice: 1160,
      rating: 5,
      reviews: 65,
      image: `${process.env.PUBLIC_URL}/items/gucci_duffle_bag.png`,
      badge: '31%'
    },
    {
      id: 2,
      name: 'RGB liquid CPU Cooler',
      price: 1960,
      rating: 5,
      reviews: 88,
      image: `${process.env.PUBLIC_URL}/items/RGB_liquid_CPU.png`
    },
    {
      id: 3,
      name: 'HAVIT HV-G92 Gamepad',
      price: 560,
      rating: 5,
      reviews: 95,
      image: `${process.env.PUBLIC_URL}/items/havit_hv.png`,
      tag: 'NEW'
    },
    {
      id: 4,
      name: 'IPS LCD Gaming Monitor',
      price: 1160,
      rating: 5,
      reviews: 55,
      image: `${process.env.PUBLIC_URL}/items/IPS_lcd.png`
    }
  ];

  return (
    <section className="bi2-section">
      <div className="bi2-container">
        <h2 className="bi2-title">Browse Items</h2>
        <p className="bi2-subtitle">
          Browse through our popular categories and find exactly what you need
        </p>

        <div className="bi2-tabrow">
          <span className="bi2-dot" />
          <span className="bi2-tabtext">Recommended Items</span>
        </div>

        <div className="bi2-strip">
          {/* left fade/arrow mock areas are optional; cards stay centered */}
          <div className="bi2-cards">
            {products.map((p) => (
              <div key={p.id} className="bi2-card">
                {(p.badge || p.tag) && (
                  <span className={`bi2-badge ${p.tag ? 'green' : 'purple'}`}>
                    {p.badge || p.tag}
                  </span>
                )}

                <div className="bi2-actions">
                  <button className="bi2-ib"><FaHeart /></button>
                  <button className="bi2-ib"><FaEye /></button>
                </div>

                <div className="bi2-img">
                  <img src={p.image} alt={p.name} />
                </div>

                <button className="bi2-cart">Add To Cart</button>

                <div className="bi2-info">
                  <div className="bi2-name">{p.name}</div>
                  <div className="bi2-prices">
                    <span className="bi2-price">₱{p.price}</span>
                    {p.oldPrice && <span className="bi2-old">₱{p.oldPrice}</span>}
                  </div>
                  <div className="bi2-starsline">
                    <div className="bi2-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="star-filled" />
                      ))}
                    </div>
                    <span className="bi2-rev">({p.reviews})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="bi2-login">Login To See More</button>
      </div>
    </section>
  );
};

export default BrowseItems;
