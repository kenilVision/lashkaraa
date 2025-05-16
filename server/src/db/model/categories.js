const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  image: String
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);