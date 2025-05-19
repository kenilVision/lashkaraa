const mongoose = require('mongoose');

const productDetailSchema = new mongoose.Schema({
  style: { type: String },
  description: { type: String, required: true },
  message: { type: String, required: true },
}, {
  _id: false,
  strict: false, 
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  media: [{
    url: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], required: true }
  }],
  
  
  price: { type: Number, required: true },
  discountedPrice: { type: Number },
  discount: { type: Number, required: true },

  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory'},

  readyToShip: { type: Boolean, default: false },
  productDetails: [productDetailSchema], 
  sizes: [{
    label: {
      type: String,
      enum: ['Unstitched', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'Custom'],
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    },
    fitting: {
      bust: { type: String },
      aboveWaist: { type: String },
      waist: { type: String },
      hips: { type: String }
    },
    blousePadding: {
      type: Boolean,
      default: false
    }
  }],

  isFeatured: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  celebCloset: { type: Boolean, default: false },
  celebimg: { type: String },
  categorySlug: { type: String },
  subCategorySlug: { type: String },
  groupSlug:{ type: String}
}, {
  timestamps: true 
});
const toSlug = str => str?.toLowerCase().trim().replace(/\s+/g, '-');

// Pre-save: auto slug + discounted price
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = toSlug(this.name);
  }

  if (this.isModified('price') || this.isModified('discount')) {
    const discountAmount = (this.price * this.discount) / 100;
    this.discountedPrice = parseFloat((this.price - discountAmount).toFixed(2));
  }

  next();
});



const recalculateDiscount = async function (next) {
  const update = this.getUpdate();

  const price = update.price ?? update.$set?.price;
  const discount = update.discount ?? update.$set?.discount;

  if (price != null || discount != null) {
    const product = await this.model.findOne(this.getQuery());
    const finalPrice = price ?? product.price;
    const finalDiscount = discount ?? product.discount;

    const discounted = finalPrice - (finalPrice * finalDiscount / 100);
    if (!update.$set) update.$set = {};
    update.$set.discountedPrice = parseFloat(discounted.toFixed(2));
  }

  next();
};

productSchema.pre('findOneAndUpdate', recalculateDiscount);
productSchema.pre('updateOne', recalculateDiscount);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
