const Booking = require('../models/Bookings');
const nodemailer = require('nodemailer');

// Example email sender setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// ===============================
// GET Pending Notifications
// ===============================
exports.getPendingNotifications = async (req, res, next) => {
  try {
    const bookings = await Booking.find({
      status: { $in: ['approved', 'cancelled'] },
      notificationSent: false
    }).populate('renter', 'name email')
      .populate('item', 'title');

    res.json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

// ===============================
// SEND Notification
// ===============================
exports.sendNotification = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId).populate('renter', 'name email').populate('item', 'title');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.notificationSent) return res.status(400).json({ message: 'Notification already sent' });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: booking.renter.email,
      subject: `Booking ${booking.status.toUpperCase()}`,
      text: `Hi ${booking.renter.name}, your booking for "${booking.item.title}" has been ${booking.status}.`
    };

    await transporter.sendMail(mailOptions);

    booking.notificationSent = true;
    await booking.save();

    res.json({ success: true, message: 'Notification sent', booking });
  } catch (err) {
    next(err);
  }
};