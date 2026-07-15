const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  temple:       { type: mongoose.Schema.Types.ObjectId, ref: 'Temple', required: true },
  templeName:   { type: String, required: true },
  visitDate:    { type: Date, required: true },
  timeSlot:     { type: String, required: true },
  devoteeCount: { type: Number, required: true, min: 1, max: 10 },
  poojaType:    { type: String, default: 'Darshan Only' },
  poojaFee:     { type: Number, default: 0 },
  ticketFee:    { type: Number, required: true },
  serviceCharge:{ type: Number, default: 20 },
  totalAmount:  { type: Number, required: true },
  devoteeName:  { type: String, required: true },
  devoteePhone: { type: String, required: true },
  aadharLast4:  { type: String },
  bookingRef:   { type: String, unique: true },
  status:       { type: String, enum: ['confirmed', 'cancelled', 'completed'], default: 'confirmed' },
  paymentStatus:{ type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
}, { timestamps: true });

// Auto-generate booking reference
bookingSchema.pre('save', function (next) {
  if (!this.bookingRef) {
    this.bookingRef = 'DE-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
