import React from 'react';
import './FeaturedCategories.css';

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      title: 'Clothes',
      description: 'Designer wear for every occasion',
      images: [
        `${process.env.PUBLIC_URL}/suits.png`,
        `${process.env.PUBLIC_URL}/gown.png`
      ],
      layout: 'dual'
    },
    {
      id: 2,
      title: 'Homes & Apartments',
      description: 'Short-term and long-term stays',
      images: [`${process.env.PUBLIC_URL}/house.png`],
      layout: 'single'
    },
    {
      id: 3,
      title: 'Vehicles',
      description: 'From compact to luxury vehicles',
      images: [`${process.env.PUBLIC_URL}/car.png`],
      layout: 'single'
    },
    {
      id: 4,
      title: 'Gadgets',
      description: 'Latest tech and electronics',
      images: [`${process.env.PUBLIC_URL}/gadgets.png`],
      layout: 'single'
    }
  ];

  return (
    <div className="fc2-wrap-fix">
      <section className="fc2-section">
        <div className="fc2-container">
          <h2 className="fc2-heading">Featured Categories</h2>
          <p className="fc2-subheading">
            Browse through our popular categories and find exactly what you need
          </p>

          <div className="fc2-grid">
            <div className="fc2-row">
              {categories.slice(0, 2).map((cat) => (
                <div key={cat.id} className="fc2-card">
                  <div className={`fc2-band ${cat.layout}`}>
                    {cat.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={cat.title}
                        className={`fc2-img ${cat.layout === 'dual' ? 'half' : 'full'}`}
                      />
                    ))}
                  </div>

                  <div className="fc2-body">
                    <h3 className="fc2-title">{cat.title}</h3>
                    <p className="fc2-desc">{cat.description}</p>
                    <button className="fc2-pill">
                      Browse <span className="chev">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="fc2-row">
              {categories.slice(2, 4).map((cat) => (
                <div key={cat.id} className="fc2-card">
                  <div className={`fc2-band ${cat.layout}`}>
                    {cat.images.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt={cat.title}
                        className="fc2-img full"
                      />
                    ))}
                  </div>

                  <div className="fc2-body">
                    <h3 className="fc2-title">{cat.title}</h3>
                    <p className="fc2-desc">{cat.description}</p>
                    <button className="fc2-pill">
                      Browse <span className="chev">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fc2-seeall-wrap">
            <button className="fc2-seeall">
              See all <span className="chev">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturedCategories;
