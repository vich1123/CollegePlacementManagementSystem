const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  subject: { type: String, required: true }, // Subject for better categorization
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["General", "Interview Invitation", "Interview Reminder", "Interview Confirmation"], 
    required: true 
  },
  interviewDate: { type: Date }, // Stores the interview date if applicable
  interviewTime: { type: String }, // Stores the interview time if applicable
  companyName: { type: String }, // Stores company name if applicable
  jobTitle: { type: String }, // Stores job title if applicable
  interviewLink: { type: String }, // Stores interview link if applicable
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", NotificationSchema);
