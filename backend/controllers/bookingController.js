// controllers/bookingController.js
const Booking = require('../models/Booking');
const Item = require('../models/Item');
const { createNotification } = require('./notificationController');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      itemId, startDate, endDate, totalAmount, subtotal,
      shippingFee = 0, securityDeposit = 0, discount = 0,
      deliveryMethod, couponCode
    } = req.body;

    const renterId = req.user.userId;

    // Validate required fields
    if (!itemId || !startDate || !endDate || !totalAmount || !subtotal || !deliveryMethod) {
      return res.status(400).json({ success: false, msg: 'Missing required booking fields.' });
    }

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ success: false, msg: 'Item not found' });

    if (item.owner.toString() === renterId) {
      return res.status(400).json({ success: false, msg: 'You cannot book your own item.' });
    }

    const newBooking = new Booking({
      userId: renterId,
      itemId,
      ownerId: item.owner,
      startDate,
      endDate,
      totalAmount,
      subtotal,
      shippingFee,
      securityDeposit,
      discount,
      deliveryMethod,
      couponCode,
    });

    await newBooking.save();

    // Notify owner
    await createNotification({
      recipientId: item.owner,
      senderId: renterId,
      type: 'new_booking',
      bookingId: newBooking._id,
      message: `You have a new booking request for your item: ${item.title}`,
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking,
    });

  } catch (err) {
    console.error('[CREATE BOOKING] Error:', err);
    res.status(500).json({ success: false, msg: 'Error creating booking', message: err.message });
  }
};
