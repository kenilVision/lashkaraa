  const mongoose = require('mongoose');

  const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false }
  });

  const subCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    items: { type: [itemSchema], default: [] }
  } );

  const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    subCategories: { type: [subCategorySchema], default: [] }
  }, { timestamps: true });

  module.exports = mongoose.model('Category', categorySchema);