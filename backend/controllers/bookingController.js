const Booking = require('../models/Booking');
const Item = require('../models/Item');

// ===============================
// RENTER: CREATE BOOKING
// ===============================
exports.createBooking = async (req, res, next) => {
  try {
    const { item, startDate, endDate } = req.body;
    const renterId = req.user.id; // from auth middleware

    // 1. Check item exists
    const foundItem = await Item.findById(item);
    if (!foundItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // 2. Prevent booking your own item
    if (foundItem.owner.toString() === renterId) {
      return res.status(400).json({ message: 'You cannot book your own item' });
    }

    // 3. Prevent overlapping bookings (approved or pending)
    const overlapping = await Booking.findOne({
      item,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'This item is already booked for the selected dates' });
    }

    // 4. Calculate total price
    const days =
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24);

    const totalPrice = days * foundItem.pricePerDay;

    // 5. Create booking
    const booking = await Booking.create({
      item,
      renter: renterId,
      owner: foundItem.owner,
      startDate,
      endDate,
      totalPrice,
    });

    res.status(201).json({
      message: 'Booking created successfully',
      booking
    });

  } catch (error) {
    next(error);
  }
};

// ===============================
// RENTER: GET THEIR BOOKINGS
// ===============================
exports.getMyBookings = async (req, res, next) => {
  try {
    const renterId = req.user.id;

    const bookings = await Booking.find({ renter: renterId })
      .populate('item')
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ===============================
// RENTER: CANCEL BOOKING
// ===============================
exports.cancelBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const renterId = req.user.id;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only renter can cancel
    if (booking.renter.toString() !== renterId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    // Cannot cancel rejected bookings
    if (booking.status === 'rejected') {
      return res.status(400).json({ message: 'Cannot cancel a rejected booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    next(error);
  }
};

// ===============================
// OWNER: GET BOOKINGS FOR THEIR ITEMS
// ===============================
exports.getBookingsForMyItems = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

    const bookings = await Booking.find({ owner: ownerId })
      .populate('item')
      .populate('renter', 'name email')
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
};

// ===============================
// OWNER: APPROVE / REJECT BOOKING
// ===============================
exports.updateBookingStatus = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const ownerId = req.user.id;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only owner can update booking
    if (booking.owner.toString() !== ownerId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    // Cannot update cancelled bookings
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Cannot update a cancelled booking' });
    }

    // Update booking status
    booking.status = status;
    await booking.save();

    // Availability Logic
    const hasActiveBookings = await Booking.exists({
    item: booking.item,
    status: { $in: ['approved', 'pending'] }
    });

    // If ANY active booking exists → unavailable, else → available
    await Item.findByIdAndUpdate(booking.item, {
    available: !hasActiveBookings
    });

    res.json({ message: `Booking ${status}`, booking });
  } catch (error) {
    next(error);
  }
};

// ===============================
// SYSTEM: GET BOOKING BY ID
// ===============================
exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('item')
      .populate('owner', 'name email')
      .populate('renter', 'name email');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ booking });
  } catch (error) {
    next(error);
  }
};
