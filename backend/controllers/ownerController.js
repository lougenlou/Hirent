const Item = require("../models/Item");
const Booking = require("../models/Booking");

// GET owner stats
const getStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    // Count total listings for this owner
    const totalListings = await Item.countDocuments({ owner: userId });

    // Calculate monthly earnings from bookings
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const monthlyBookings = await Booking.find({
      ownerId: userId,
      createdAt: {
        $gte: firstDayOfMonth,
        $lte: lastDayOfMonth
      },
      status: "completed" // consider 'completed' as paid
    });

    const monthlyEarnings = monthlyBookings.reduce(
      (total, booking) => total + (booking.totalAmount || 0),
      0
    );

    res.json({
      success: true,
      stats: {
        totalListings,
        monthlyEarnings
      }
    });
  } catch (error) {
    console.error('[GET STATS] Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    });
  }
};

module.exports = {
  getStats
};
