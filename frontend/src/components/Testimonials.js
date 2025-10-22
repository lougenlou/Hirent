import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      since: 'Member since 2023',
      rating: 5,
      text:
        'Super easy to use and the products I rented was of good quality!',
      avatar: 'M'
    },
    {
      id: 2,
      name: 'John Reyes',
      since: 'Member since 2022',
      rating: 5,
      text:
        'Mabait ang mga sellers \nat very approachable and trustworthy.',
      avatar: 'J'
    },
    {
      id: 3,
      name: 'Sarah Chen',
      since: 'Member since 2024',
      rating: 5,
      text:
        'Good place to find clothes for events.',
      avatar: 'S'
    }
  ];

  return (
    <section className="ts-section">
      <div className="ts-container">
        <h2 className="ts-title">Our Happy Customers</h2>
        <p className="ts-subtitle">
          Real stories from real members who transformed their lives at Hirent
        </p>

        <div className="ts-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="ts-card">
              <div className="ts-stars">
                {[...Array(t.rating)].map((_, i) => (
                  <FaStar key={i} className="star-filled" />
                ))}
              </div>

              <p className="ts-text">{t.text}</p>

              <div className="ts-author">
                <div className="ts-avatar">{t.avatar}</div>
                <div className="ts-meta">
                  <div className="ts-name">{t.name}</div>
                  <div className="ts-since">{t.since}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
