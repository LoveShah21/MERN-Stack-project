const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to the user
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: { type: String }, // Optional
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: Number, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Address', addressSchema);