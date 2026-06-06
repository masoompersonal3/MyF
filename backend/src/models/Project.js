const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageData: { type: String, default: '' },       // base64 encoded image
  imageMimeType: { type: String, default: '' },   // e.g. 'image/png'
  tech: { type: [String], default: [] },
  link: { type: String, default: '#' },
  github: { type: String, default: '#' },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
