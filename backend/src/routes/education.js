const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const auth = require('../middleware/auth');

// GET /api/education — public, visible only
router.get('/', async (req, res) => {
  try {
    const cards = await Education.find({ visible: true }).sort({ order: 1, createdAt: 1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/education/all — admin
router.get('/all', auth, async (req, res) => {
  try {
    const cards = await Education.find().sort({ order: 1, createdAt: 1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/education — admin
router.post('/', auth, async (req, res) => {
  try {
    const card = await Education.create(req.body);
    res.status(201).json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/education/:id — admin
router.put('/:id', auth, async (req, res) => {
  try {
    const card = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!card) return res.status(404).json({ message: 'Education card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/education/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const card = await Education.findByIdAndDelete(req.params.id);
    if (!card) return res.status(404).json({ message: 'Education card not found' });
    res.json({ message: 'Education card deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
