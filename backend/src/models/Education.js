const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: String, required: true },
  percentage: { type: String, default: '' },
  status: { type: String, default: 'Completed' }, // 'Completed' | 'In Progress'
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);
