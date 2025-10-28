// HERO SECTION
exports.getHeroSection = (req, res) => {
  res.json({
    titleLine1: 'Rent What You Need.',
    titleLine2: "Earn From What You Don't.",
    subtitle: 'Save money, reduce waste, and join the sharing economy with HiRENT. Discover thousands of items available for rent near you.',
    stats: [
      { label: 'Items Listed', value: '10,000+' },
      { label: 'Active Users', value: '5,000+' },
      { label: 'Satisfaction', value: '99%' }
    ]
  });
};

// HOW IT WORKS
exports.getHowItWorks = (req, res) => {
  res.json([
    {
      number: 1,
      title: 'Search',
      description: 'Browse thousands of items available for rent in your area. Filter by category, price, and location.',
      icon: '/assets/icons/search.png'
    },
    {
      number: 2,
      title: 'Rent',
      description: 'Book the item for your desired dates. Connect with the owner and arrange pickup or delivery.',
      icon: '/assets/icons/rent.png'
    },
    {
      number: 3,
      title: 'Return',
      description: 'Use the item and return it when done. Rate your experience and help build our trusted community.',
      icon: '/assets/icons/return.png'
    }
  ]);
};

// WHY CHOOSE US
exports.getWhyChoose = (req, res) => {
  res.json([
    {
      title: 'Save Money',
      description: 'Why buy when you can rent? Access what you need at a fraction of the cost. Perfect for one-time events or temporary needs.',
      icon: '/assets/icons/savemoney.png'
    },
    {
      title: 'Earn Income',
      description: 'Turn your unused items into cash. List what you own and start earning passive income from items sitting idle in your home.',
      icon: '/assets/icons/earnmoney.png'
    },
    {
      title: 'Support Sustainability',
      description: 'Reduce waste and your carbon footprint. By sharing resources, we create a more sustainable future for everyone.',
      icon: '/assets/icons/supportsus.png'
    }
  ]);
};

//TESTIMONIALS
exports.getTestimonials = (req, res) => {
  res.json([
    {
      name: 'Maria Santos',
      role: '5 star renter since 2023',
      rating: 5,
      comment: "Super easy to use and I get products I needed at such great prices. I'm hooked!",
      avatar: 'MS',
      bgColor: 'bg-purple-600'
    },
    {
      name: 'John Reyes',
      role: 'Renter',
      rating: 5,
      comment: 'Hassle free renting, exactly what I needed for my event!',
      avatar: 'JR',
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Sarah Chen',
      role: '5 star renter since 2023',
      rating: 5,
      comment: 'Great service to rent cameras for my project',
      avatar: 'SC',
      bgColor: 'bg-purple-600'
    }
  ]);
};

// FEATURED CATEGORIES
exports.getFeaturedCategories = (req, res) => {
  res.json([
    {
      title: 'Clothes',
      description: 'Designer wear for every occasion',
      image: '/assets/categories/clothes.png'
    },
    {
      title: 'Homes & Apartments',
      description: 'Short-term and long-term stays',
      image: '/assets/categories/house.png'
    },
    {
      title: 'Vehicles',
      description: 'From compact to luxury vehicles',
      image: '/assets/categories/car.png'
    },
    {
      title: 'Gadgets',
      description: 'Latest tech and electronics',
      image: '/assets/categories/gadgets.png'
    }
  ]);
};
