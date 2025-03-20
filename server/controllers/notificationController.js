const nodemailer = require("nodemailer");

// Setup nodemailer transport (replace with your SMTP details)
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password (Use environment variables)
  },
});

// Send a General Notification
const sendNotification = async (req, res) => {
  try {
    const { email, message, subject } = req.body;
    if (!email || !message || !subject) {
      return res.status(400).json({ success: false, message: "Email, subject, and message are required." });
    }

    console.log(`Sending notification to ${email}: ${message}`);

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });

    res.json({ success: true, message: "Notification sent successfully!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, message: "Error sending notification", error: error.message });
  }
};

// Send Interview Invitation
const sendInterviewNotification = async (req, res) => {
  try {
    const { email, interviewDate, interviewTime, companyName, jobTitle, interviewLink, additionalMessage } = req.body;

    if (!email || !interviewDate || !interviewTime || !companyName || !jobTitle || !interviewLink) {
      return res.status(400).json({ success: false, message: "All fields are required for interview notification." });
    }

    const interviewMessage = `
      Hello,

      You have been invited for an interview for the role of ${jobTitle} at ${companyName}.

      Date: ${interviewDate}
      Time: ${interviewTime}
      Join here: ${interviewLink}

      ${additionalMessage ? `\nAdditional Message:\n${additionalMessage}\n` : ""}

      Please make sure to be on time.

      Regards,
      Placement Team
    `;

    console.log(`Sending interview notification to ${email}`);

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Interview Invitation - ${companyName} | ${jobTitle}`,
      text: interviewMessage,
    });

    res.json({ success: true, message: "Interview notification sent successfully!" });
  } catch (error) {
    console.error("Error sending interview notification:", error);
    res.status(500).json({ success: false, message: "Error sending interview notification", error: error.message });
  }
};

// Send Interview Reminder
const sendInterviewReminder = async (req, res) => {
  try {
    const { email, interviewDate, interviewTime, companyName, jobTitle, interviewLink } = req.body;

    if (!email || !interviewDate || !interviewTime || !companyName || !jobTitle || !interviewLink) {
      return res.status(400).json({ success: false, message: "All fields are required for interview reminder." });
    }

    const reminderMessage = `
      Hello,

      This is a reminder for your upcoming interview for the role of ${jobTitle} at ${companyName}.

      Date: ${interviewDate}
      Time: ${interviewTime}
      Join here: ${interviewLink}

      Please ensure you are prepared.

      Regards,
      Placement Team
    `;

    console.log(`Sending interview reminder to ${email}`);

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Reminder: Upcoming Interview - ${companyName} | ${jobTitle}`,
      text: reminderMessage,
    });

    res.json({ success: true, message: "Interview reminder sent successfully!" });
  } catch (error) {
    console.error("Error sending interview reminder:", error);
    res.status(500).json({ success: false, message: "Error sending interview reminder", error: error.message });
  }
};

// Send Interview Confirmation
const sendInterviewConfirmation = async (req, res) => {
  try {
    const { email, interviewDate, interviewTime, companyName, jobTitle, interviewLink } = req.body;

    if (!email || !interviewDate || !interviewTime || !companyName || !jobTitle || !interviewLink) {
      return res.status(400).json({ success: false, message: "All fields are required for interview confirmation." });
    }

    const confirmationMessage = `
      Hello,

      Thank you for confirming your attendance for the interview at ${companyName}.

      Role: ${jobTitle}
      Date: ${interviewDate}
      Time: ${interviewTime}
      Join here: ${interviewLink}

      Best Regards,
      Placement Team
    `;

    console.log(`Sending interview confirmation to ${email}`);

    // Send Email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmation: Interview for ${companyName} | ${jobTitle}`,
      text: confirmationMessage,
    });

    res.json({ success: true, message: "Interview confirmation sent successfully!" });
  } catch (error) {
    console.error("Error sending interview confirmation:", error);
    res.status(500).json({ success: false, message: "Error sending interview confirmation", error: error.message });
  }
};

module.exports = {
  sendNotification,
  sendInterviewNotification,
  sendInterviewReminder,
  sendInterviewConfirmation
};
