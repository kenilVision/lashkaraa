const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

filterSchema.pre('save', function (next) {
    if (!this.slug) {
      this.slug = this.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')  
        .replace(/\s+/g, '-')           
        .replace(/-+/g, '-');           
    }
    next();
  });

module.exports = mongoose.model('Filter', filterSchema);