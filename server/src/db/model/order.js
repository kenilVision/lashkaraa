const mongoose = require('mongoose');

// Define the Order schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: mongoose.Schema.Types.Mixed },
  billingAddress: { type: mongoose.Schema.Types.Mixed },
  paymentStatus: { type: String, default: 'pending' },
  paymentMethod: {
    type: String,
    enum: ['cod', 'card'],
    default: 'cod'
  },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    price: { type: Number },
    size: { type: String },
    note: { type: String }
  }],
  orderStatus: [{
    status: { type: String, enum: ['pending', 'processing', 'completed', 'shipped', 'delivered'], required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  statusTimeline: [{
    title: { 
      type: String,
      enum: [
        'Order Placed', 'Order Confirmed', 'Packed', 'Shipped', 
        'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'
      ],
      default: 'Order Placed'
    },
    status: { 
      type: String, 
      enum: ['pending', 'completed'], 
      required: true 
    },
    timeLogged: { type: Date, default: Date.now }
  }],
  estimatedDeliveryDate: { type: Date } 
}, { timestamps: true });


orderSchema.pre('save', function (next) {
  if (this.isModified('orderStatus') && this.orderStatus.some(status => status.status === 'delivered')) {
    let status = 'pending';

    
    const currentDate = new Date();
    const estimatedDays = 7;

    
    this.estimatedDeliveryDate = new Date(currentDate.setDate(currentDate.getDate() + estimatedDays));

    
    if (this.orderStatus.some(status => status.status === 'delivered')) {
      status = 'completed';
    }

    
    if (this.statusTimeline.length > 0) {
      const lastEntry = this.statusTimeline[this.statusTimeline.length - 1];
      if (lastEntry.status !== 'completed') {
        lastEntry.status = 'completed';
      }
    }

    
    this.statusTimeline.push({
      title: 'Delivered',
      status: status,
      timeLogged: Date.now(),
    });
  }

  next();
});


module.exports = mongoose.model('Order', orderSchema);
