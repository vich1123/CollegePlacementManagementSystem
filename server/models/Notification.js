const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
