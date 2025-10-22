import React from 'react';
import { FaMoneyBillWave, FaHandHoldingUsd, FaLeaf } from 'react-icons/fa';
import './WhyChoose.css';

const WhyChoose = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaMoneyBillWave />,
      title: 'Save Money',
      description:
        'Why buy when you can rent? Access what you need at a fraction of the cost. Perfect for one-time events or temporary needs.'
    },
    {
      id: 2,
      icon: <FaHandHoldingUsd />,
      title: 'Earn Income',
      description:
        'Turn your unused items into cash. List what you own and start earning passive income from items sitting idle in your home.'
    },
    {
      id: 3,
      icon: <FaLeaf />,
      title: 'Support Sustainability',
      description:
        'Reduce waste and your carbon footprint. By sharing resources, we create a more sustainable future for everyone.'
    }
  ];

  return (
    <section className="wc-section">
      <div className="wc-container">
        <h2 className="wc-title">Why Choose Hirent?</h2>
        <p className="wc-subtitle">
          Join thousands of users who are already saving money and earning income
        </p>

        <div className="wc-grid">
          {reasons.map((r) => (
            <div key={r.id} className="wc-card">
              <div className="wc-iconwrap">
                <div className="wc-icon">{r.icon}</div>
              </div>
              <div className="wc-card-title">{r.title}</div>
              <p className="wc-card-desc">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
