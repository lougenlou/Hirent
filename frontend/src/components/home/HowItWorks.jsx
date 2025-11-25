// src/components/home/HowItWorks.js
import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Search',
      description: 'Browse thousands of items available for rent in your area. Filter by category, price, and location.',
      icon: '/assets/icons/search.png',
    },
    {
      number: 2,
      title: 'Rent',
      description: 'Book the item for your desired dates. Connect with the owner and arrange pickup or delivery.',
      icon: '/assets/icons/rent.png',
    },
    {
      number: 3,
      title: 'Return',
      description: 'Use the item and return it when done. Rate your experience and help build our trusted community.',
      icon: '/assets/icons/return.png',
    },
  ];

  return (
    <section
      className="py-20 px-6 md:px-16 lg:px-24 relative"
      style={{
        backgroundImage: 'url(/assets/bg/howitworks_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#7A1CA9'
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-base text-purple-200">
            Renting on HiRENT is simple and secure. Get started in three easy steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center">
              {/* Connecting Line (between icons) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute h-0.5"
                  style={{
                    width: '100%',
                    top: '60px',
                    left: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    zIndex: 0
                  }}
                />
              )}

              {/* Icon Image */}
              <div className="relative z-10 mb-4">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="w-32 h-32 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-center mb-2 text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p
                className="text-base text-center max-w-sm text-purple-200 leading-relaxed"
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
