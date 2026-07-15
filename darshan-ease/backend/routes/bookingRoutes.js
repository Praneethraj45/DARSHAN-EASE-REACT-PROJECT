const express  = require('express');
const router   = express.Router();
const Booking  = require('../models/Booking');
const Temple   = require('../models/Temple');
const { protect } = require('../middleware/authMiddleware');

// POST /api/bookings — create booking (login required)
router.post('/', protect, async (req, res) => {
  try {
    const {
      templeId, visitDate, timeSlot, devoteeCount,
      poojaType, poojaFee, devoteeName, devoteePhone, aadharLast4
    } = req.body;

    const temple = await Temple.findById(templeId);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });

    const ticketFee  = temple.ticketPrice * devoteeCount;
    const totalAmount = ticketFee + (poojaFee || 0) + 20;

    const booking = await Booking.create({
      user: req.user._id,
      temple: templeId,
      templeName: temple.name,
      visitDate,
      timeSlot,
      devoteeCount,
      poojaType:  poojaType  || 'Darshan Only',
      poojaFee:   poojaFee   || 0,
      ticketFee,
      totalAmount,
      devoteeName,
      devoteePhone,
      aadharLast4
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/bookings/my — logged-in user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/bookings/:id/cancel — cancel a booking
router.put('/:id/cancel', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    await booking.save();
    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
