const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  style: { type: String, },
  color: { type: String,},
  fabric: { type: String,  },
  embroidery: { type: String,  },
  description: { type: String, required: true },
  message: { type: String, required: true }
}, { _id: false });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  images: [{ type: String, required: true }], 
  video: { type: String, required: false },  
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, required: true },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category',required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId },
  itemId: { type: mongoose.Schema.Types.ObjectId}, 

  readyToShip: { type: Boolean, default: false }, 
  productDetails: [productDetailSchema], 
  sizes: { 
    type: [String], 
    enum: ['Unstitched', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'Custom'],
    required: true,
  }, 

  categorySlug: { type: String },
  subCategorySlug: { type: String },
  itemSlug: { type: String },
  readyToShipSlug: { type: String },
}, {
  timestamps: true 
});

const toSlug = str => str?.toLowerCase().trim().replace(/\s+/g, '-');

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = toSlug(this.name);
  }

  if (this.readyToShip) {
    this.readyToShipSlug = `ready-to-ship`;
  }
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
