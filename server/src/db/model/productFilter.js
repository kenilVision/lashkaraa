const mongoose = require('mongoose');

const productFilterSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  filterOptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FilterOption',
    required: true, 
  },
});

module.exports = mongoose.model('ProductFilter', productFilterSchema);