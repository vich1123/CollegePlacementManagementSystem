import React, { useState } from "react";

const InterviewNotification = ({ email }) => {
  const [formData, setFormData] = useState({
    interviewDate: "",
    interviewTime: "",
    companyName: "",
    jobTitle: "",
    interviewLink: "",
    message: "",
  });

  const [notificationMessage, setNotificationMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendNotification = () => {
    fetch("/api/notifications/interview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, ...formData }),
    })
      .then((res) => res.json())
      .then((data) => {
        setNotificationMessage(data.message);
      })
      .catch((err) => {
        console.error(err);
        setNotificationMessage("Error sending notification.");
      });
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-semibold">Send Interview Notification</h2>

      <input
        type="date"
        name="interviewDate"
        value={formData.interviewDate}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
        required
      />

      <input
        type="time"
        name="interviewTime"
        value={formData.interviewTime}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
        required
      />

      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
        required
      />

      <input
        type="text"
        name="jobTitle"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
        required
      />

      <input
        type="text"
        name="interviewLink"
        placeholder="Interview Link (Zoom, Google Meet, etc.)"
        value={formData.interviewLink}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
        required
      />

      <textarea
        name="message"
        placeholder="Enter additional message (optional)"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-2 mt-2 border rounded"
      ></textarea>

      <button
        onClick={sendNotification}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Send Notification
      </button>

      {notificationMessage && (
        <p className="mt-2 text-green-600">{notificationMessage}</p>
      )}
    </div>
  );
};

export default InterviewNotification;
