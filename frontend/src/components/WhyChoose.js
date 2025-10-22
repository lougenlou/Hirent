import React from 'react';
import { FaMoneyBillWave, FaHandHoldingUsd, FaLeaf } from 'react-icons/fa';
import './WhyChoose.css';

const WhyChoose = () => {
  const reasons = [
    {
      id: 1,
      icon: <FaMoneyBillWave />,
      title: 'Save Money',
      description: 'Why buy when you can rent? Save money by renting items only when you need them for temporary or occasional use.'
    },
    {
      id: 2,
      icon: <FaHandHoldingUsd />,
      title: 'Earn Income',
      description: 'Turn your unused items into cash. List what you own and start earning passive income from items sitting idle in your home.'
    },
    {
      id: 3,
      icon: <FaLeaf />,
      title: 'Support Sustainability',
      description: 'Reduce waste and your carbon footprint by sharing resources. Be part of a community that values sustainability over single-use ownership.'
    }
  ];

  return (
    <section className="why-choose">
      <div className="container">
        <h2 className="section-title">Why Choose Hirent?</h2>
        <p className="section-subtitle">
          Join thousands of users who are already saving money and earning income
        </p>
        
        <div className="reasons-grid">
          {reasons.map((reason) => (
            <div key={reason.id} className="reason-card">
              <div className="reason-icon-svg">
                {reason.icon}
              </div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
