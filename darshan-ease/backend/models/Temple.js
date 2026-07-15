const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  location:    { type: String, required: true },
  state:       { type: String, required: true },
  description: { type: String },
  emoji:       { type: String, default: '🛕' },
  tag:         { type: String },
  ticketPrice: { type: Number, required: true },
  rating:      { type: Number, default: 4.5 },
  image:       { type: String },
  availableSlots: [{
    time:     { type: String },
    capacity: { type: Number, default: 50 },
    booked:   { type: Number, default: 0 }
  }],
  poojaTypes: [{
    name:        { type: String },
    price:       { type: Number },
    description: { type: String }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
