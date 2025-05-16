const mongoose = require('mongoose');

const filterOptionSchema = new mongoose.Schema({
  filterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Filter',
    required: true,
  },
  value: {
    type: String,
    required: true,
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


filterOptionSchema.pre('save', function (next) {
    if (!this.slug) {
      this.slug = this.value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')  
        .replace(/\s+/g, '-')          
        .replace(/-+/g, '-');          
    }
    next();
  });
  

module.exports = mongoose.model('FilterOption', filterOptionSchema);