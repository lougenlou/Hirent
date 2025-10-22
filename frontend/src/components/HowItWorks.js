import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Search',
      description:
        'Browse thousands of items available for rent in your area. Filter by category, price, and location.',
      icon: '/icons/landing_search.png',
    },
    {
      id: 2,
      title: 'Rent',
      description:
        'Book the item for your desired dates. Connect with the owner and arrange pickup or delivery.',
      icon: '/icons/landing_rent.png',
    },
    {
      id: 3,
      title: 'Return',
      description:
        'Use the item and return it when done. Rate your experience and help build our trusted community.',
      icon: '/icons/landing_return.png',
    },
  ];

  return (
    <section
      className="hiw"
      style={{
        backgroundImage:
          `linear-gradient(0deg, rgba(20,0,40,.24), rgba(20,0,40,.24)), url(${process.env.PUBLIC_URL}/bg/howitworks_bg.png)`,
      }}
    >
      <div className="hiw__inner">
        <h2 className="hiw__title">How It Works</h2>
        <p className="hiw__sub">
          Renting on HIRENT is simple and secure. Get started in three easy steps.
        </p>

        <div className="hiw__row">
          {steps.map((s, i) => (
            <div className="hiw__col" key={s.id}>
              <div className="hiw__card">
                <div className="hiw__badge">{s.id}</div>
                <div className="hiw__icon">
                  <img src={s.icon} alt={s.title} />
                </div>
                <h3 className="hiw__label">{s.title}</h3>
                <p className="hiw__desc">{s.description}</p>
              </div>
              {i < steps.length - 1 && <span className="hiw__connector" aria-hidden />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
