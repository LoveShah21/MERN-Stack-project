const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID of the user submitting feedback
  name: { type: String, required: true },  // Name of the user
  email: { type: String, required: true }, // Email of the user
  message: { type: String, required: true }, // Feedback message
  rating: { type: Number, min: 1, max: 5, required: true }, // Rating (1-5)
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Feedback', feedbackSchema);