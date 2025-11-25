const Item = require('../models/Items');

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().limit(50);
    res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Failed to create item" });
  }
};

// Search items
const searchItems = async (req, res) => {
  try {
    const { query, category, minPrice, maxPrice, available, featured, sort, limit } = req.query;

    let filter = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ];
    }

    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.pricePerDay = {};
      if (minPrice) filter.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerDay.$lte = Number(maxPrice);
    }

    if (available !== undefined) filter.available = available === "true";
    if (featured !== undefined) filter.featured = featured === "true";

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
      .limit(Number(limit) || 50);

    res.status(200).json({ success: true, count: items.length, items });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Export all functions as CommonJS
module.exports = { getAllItems, createItem, searchItems };