const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');
const auth = require('../middleware/auth');

// GET /api/content — public
router.get('/', async (req, res) => {
  try {
    const content = await SiteContent.getSingleton();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/content — admin only
router.put('/', auth, async (req, res) => {
  try {
    const content = await SiteContent.getSingleton();
    const allowed = [
      'heroTexts', 'aboutContent', 'featuredTitle', 'featuredSubtitle',
      'timelineTitle', 'timelineSubtitle', 'contactHeading', 'contactSubtitle',
      'contactEmail', 'footerLinks'
    ];
    allowed.forEach(key => {
      if (req.body[key] !== undefined) content[key] = req.body[key];
    });
    await content.save();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
