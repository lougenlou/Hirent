const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  item: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Item', 
    required: true 
  },

  renter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  startDate: { 
    type: Date, 
    required: true 
  },

  endDate: { 
    type: Date, 
    required: true 
  },

  totalPrice: { 
    type: Number, 
    required: true 
  },

  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'cancelled'], 
    default: 'pending' 
  },

    notificationSent: { 
    type: Boolean, 
    default: false 
  },

  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid', 'refunded'],
    default: 'unpaid'
  }

}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
