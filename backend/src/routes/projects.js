const express = require('express');
const multer = require('multer');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// multer: memory storage so we can convert to base64
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// Middleware wrapper so multer errors go to Express error handler
const uploadSingle = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return next(err);
    next();
  });
};

// GET /api/projects — public, visible only
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/projects/all — admin, all projects
router.get('/all', auth, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: 1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/projects — admin, create project
router.post('/', auth, uploadSingle, async (req, res) => {
  try {
    const { title, description, tech, link, github, visible, order } = req.body;
    const techArray = tech ? tech.split(',').map(t => t.trim()).filter(Boolean) : [];

    const projectData = {
      title,
      description,
      tech: techArray,
      link: link || '#',
      github: github || '#',
      visible: visible === 'false' ? false : true,
      order: order ? parseInt(order) : 0,
    };

    if (req.file) {
      projectData.imageData = req.file.buffer.toString('base64');
      projectData.imageMimeType = req.file.mimetype;
    }

    const project = await Project.create(projectData);
    res.status(201).json(project);
  } catch (err) {
    console.error('Create project error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/projects/:id — admin, update project
router.put('/:id', auth, uploadSingle, async (req, res) => {
  try {
    const { title, description, tech, link, github, visible, order } = req.body;

    const update = {};
    if (title !== undefined) update.title = title;
    if (description !== undefined) update.description = description;
    if (tech !== undefined) update.tech = tech ? tech.split(',').map(t => t.trim()).filter(Boolean) : [];
    if (link !== undefined) update.link = link;
    if (github !== undefined) update.github = github;
    if (visible !== undefined) update.visible = visible === 'false' ? false : true;
    if (order !== undefined) update.order = parseInt(order);

    if (req.file) {
      update.imageData = req.file.buffer.toString('base64');
      update.imageMimeType = req.file.mimetype;
    }

    const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Update project error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/projects/:id — admin
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
