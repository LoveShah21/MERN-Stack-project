const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number}
    },
  ],
  totalPrice:{type: String},
  status: { type: String, enum: ['Pending', 'Quotation generated', 'Shipped', 'In transit', 'Delivered', 'Cancelled'], default: 'Pending' },
  address: {type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
  orderNotes: { type: String }, // Optional
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);