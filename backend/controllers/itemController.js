const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, available, featured, sort, limit } = req.query;

    let filter = {};

    // 🔎 Search by title or description
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }

    // 🏷 Category filter
    if (category) filter.category = category;

    // 💰 Price range
    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    // ✔ Availability filter
    if (available !== undefined) filter.available = available === "true";

    // ⭐ Featured filter
    if (featured !== undefined) filter.featured = featured === "true";

    // ↕ Sort options
    let sortOption = {};
    switch (sort) {
      case "price_asc": sortOption.pricePerDay = 1; break;
      case "price_desc": sortOption.pricePerDay = -1; break;
      case "newest": sortOption.createdAt = -1; break;
      case "oldest": sortOption.createdAt = 1; break;
    }

    const items = await Item.find(filter)
      .populate("category")
      .sort(sortOption)
      .limit(Number(limit) || 50); // default limit 50

    res.status(200).json({
      success: true,
      count: items.length,
      items
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
