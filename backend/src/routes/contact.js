const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');

// POST /api/contact — public, submit form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }
    const contact = await Contact.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully', id: contact._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/contact — admin, all messages newest first
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/contact/:id/read — admin, toggle read
router.put('/:id/read', auth, async (req, res) => {
  try {
    const msg = await Contact.findById(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    msg.read = !msg.read;
    await msg.save();
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/contact/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
