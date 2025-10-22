import React from 'react';
import { FaStar } from 'react-icons/fa';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Maria Santos',
      date: 'Rented on June 2023',
      rating: 5,
      text: 'Super easy to use and the products I found were just like the description! Highly recommend.',
      avatar: 'M'
    },
    {
      id: 2,
      name: 'John Reyes',
      date: 'Listed item on May 2023',
      rating: 5,
      text: 'Listing was easy, why haven\'t done this sooner? Great way to make extra cash!',
      avatar: 'J'
    },
    {
      id: 3,
      name: 'Sarah Chen',
      date: 'Rented on August 2023',
      rating: 5,
      text: 'Quick delivery, my items were in great condition, I\'ll definitely rent again!',
      avatar: 'S'
    }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">Our Happy Customers</h2>
        <p className="section-subtitle">
          Real stories from real members who transformed their lives with Hirent
        </p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="star-filled" />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-date">{testimonial.date}</p>
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
