const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, sparse: true }, // Firebase UID
  name: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String }, // Optional for Firebase users
  addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
  isAdmin: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);