const Booking = require('../models/Booking');
const Item = require('../models/Item');
const { createNotification } = require('./notificationController');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      itemId,
      startDate,
      endDate,
      paymentMethod, // ✅ REQUIRED
      totalAmount,
      subtotal,
      shippingFee,
      securityDeposit,
      discount,
      deliveryMethod,
      couponCode,
    } = req.body;

    const renterId = req.user.userId;

    // 🔒 BASIC VALIDATION
    if (
      !itemId ||
      !startDate ||
      !endDate ||
      !paymentMethod ||
      !deliveryMethod ||
      totalAmount == null ||
      subtotal == null
    ) {
      return res.status(400).json({
        success: false,
        msg: 'Missing required booking fields',
      });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ success: false, msg: 'Item not found' });
    }

    if (item.owner.toString() === renterId) {
      return res
        .status(400)
        .json({ success: false, msg: 'You cannot book your own item.' });
    }

    const newBooking = new Booking({
      userId: renterId,
      itemId,
      ownerId: item.owner,
      startDate,
      endDate,
      paymentMethod, // ✅ STORED
      totalAmount,
      subtotal,
      shippingFee,
      securityDeposit,
      discount,
      deliveryMethod,
      couponCode,
    });

    await newBooking.save();

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
    res.status(500).json({
      success: false,
      msg: 'Error creating booking',
      message: err.message,
    });
  }
};
