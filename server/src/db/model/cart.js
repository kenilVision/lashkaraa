const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  blousePadding: { type: String },
  size: { type: String, required:true },
  note: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);