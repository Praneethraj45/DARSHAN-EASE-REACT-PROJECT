const express = require('express');
const router  = express.Router();
const Temple  = require('../models/Temple');

// GET /api/temples — get all temples
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = { isActive: true };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { state: { $regex: search, $options: 'i' } }
      ];
    }
    const temples = await Temple.find(query);
    res.json(temples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/temples/:id — single temple
router.get('/:id', async (req, res) => {
  try {
    const temple = await Temple.findById(req.params.id);
    if (!temple) return res.status(404).json({ message: 'Temple not found' });
    res.json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/temples — add temple (admin use)
router.post('/', async (req, res) => {
  try {
    const temple = await Temple.create(req.body);
    res.status(201).json(temple);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
