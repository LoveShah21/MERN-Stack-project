const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  recipients: { type: [String], required: true }, // Array of emails or phone numbers
  type: { type: String, enum: ["email", "sms"], required: true }, // Notification type
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", notificationSchema);