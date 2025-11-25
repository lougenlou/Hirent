const Item = require('../models/Item');

exports.searchItems = async (req, res) => {
  try {
    const {
      query,
      category,
      minPrice,
      maxPrice,
      available,
      featured,
      sort
    } = req.query;

    let filter = {};

    // 🔎 SEARCH (title or description)
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }

    // 🏷 CATEGORY FILTER
    if (category) {
      filter.category = category; // must be ObjectId string
    }

    // 💰 PRICE RANGE (pricePerDay)
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    // ✔ AVAILABILITY FILTER
    if (available !== undefined) {
      filter.available = available === "true";
    }

    // ⭐ FEATURED FILTER
    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    // ↕ SORT OPTIONS
    let sortOption = {};
    
    switch (sort) {
      case "price_asc":
        sortOption.pricePerDay = 1;
        break;
      case "price_desc":
        sortOption.pricePerDay = -1;
        break;
      case "newest":
        sortOption.createdAt = -1;
        break;
      case "oldest":
        sortOption.createdAt = 1;
        break;
    }

    // Fetch items
    const items = await Item.find(filter).populate("category").sort(sortOption);

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
