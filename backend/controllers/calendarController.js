// controllers/calendarController.js
const Booking = require('../models/Booking');
const Item = require('../models/Item');
const User = require('../models/User');

// Convert Booking → Calendar Event format
function bookingToEvent(booking) {
  const itemName = booking.item?.name || 'Item';
  const renterName = booking.renter?.name || 'Renter';
  const ownerName = booking.owner?.name || 'Owner';

  return {
    id: booking._id.toString(),
    title: `${itemName} — Rented by ${renterName}`,
    start: booking.startDate,
    end: booking.endDate,
    allDay: false,
    extendedProps: {
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      itemId: booking.item?._id,
      itemName,
      renterId: booking.renter?._id,
      renterName,
      ownerId: booking.owner?._id,
      ownerName,
      totalPrice: booking.totalPrice
    }
  };
}

// ----------------------------------------
// VIEW 1: Renter Calendar
// ----------------------------------------
exports.getRenterEvents = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ renter: userId })
      .populate('item', 'name')
      .populate('renter', 'name')
      .populate('owner', 'name');

    return res.json({
      success: true,
      events: bookings.map(bookingToEvent)
    });

  } catch (err) {
    next(err);
  }
};

// ----------------------------------------
// VIEW 2: Owner Calendar (Items they own)
// ----------------------------------------
exports.getOwnerEvents = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ owner: userId })
      .populate('item', 'name')
      .populate('renter', 'name')
      .populate('owner', 'name');

    return res.json({
      success: true,
      events: bookings.map(bookingToEvent)
    });

  } catch (err) {
    next(err);
  }
};

// ----------------------------------------
// Single event (for clicking on calendar)
// ----------------------------------------
exports.getEventById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('item', 'name')
      .populate('renter', 'name')
      .populate('owner', 'name');

    if (!booking) {
      return res.status(404).json({ success: false, message: "Event not found." });
    }

    const userId = req.user.id;

    const isOwner = booking.owner._id.toString() === userId;
    const isRenter = booking.renter._id.toString() === userId;

    if (!isOwner && !isRenter) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    return res.json({
      success: true,
      event: bookingToEvent(booking)
    });

  } catch (err) {
    next(err);
  }
};
