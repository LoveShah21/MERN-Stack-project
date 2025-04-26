const mongoose = require('mongoose');
const Order = require('./Order');

const trackingSchema = new mongoose.Schema({
  orderId: { type: String, ref: 'Order', required: true }, // Foreign key to Order
  trackingNumber: { type: String, required: true, unique: true },
  status: { type: String, required: true, enum: ['Pending', 'Quotation generated', 'Shipped', 'In Transit', 'Delivered', 'Cancelled'] },
  location: { type: String, required: true },
  estimatedDelivery: { type: Date, required: true }, 
  createdAt: { type: Date, default: Date.now },
  updates: [{
    updateType: {type:String, required: true},
    status: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Tracking', trackingSchema);