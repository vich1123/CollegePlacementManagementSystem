import React, { useState } from "react";
import axios from "axios";

function InterviewScheduler() {
  const [formData, setFormData] = useState({ studentEmail: "", company: "", jobTitle: "", date: "", time: "", interviewLink: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Schedule the interview in the backend
      const response = await axios.post("https://collegeplacementmanagementsystem-1.onrender.com/api/interviews", formData);
      setMessage(response.data.message || "Interview scheduled successfully!");

      // Send automated interview notification
      await axios.post("https://collegeplacementmanagementsystem-1.onrender.com/api/notifications/interview", {
        email: formData.studentEmail,
        interviewDate: formData.date,
        interviewTime: formData.time,
        companyName: formData.company,
        jobTitle: formData.jobTitle,
        interviewLink: formData.interviewLink,
      });

      setMessage("Interview scheduled and notification sent successfully!");
      setFormData({ studentEmail: "", company: "", jobTitle: "", date: "", time: "", interviewLink: "" });
    } catch (error) {
      console.error("Error scheduling interview:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error scheduling interview.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSubmit}>
        <h2 className="form-title">Schedule an Interview</h2>
        <input name="studentEmail" value={formData.studentEmail} onChange={handleChange} placeholder="Student Email" required />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
        <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="time" type="time" value={formData.time} onChange={handleChange} required />
        <input name="interviewLink" value={formData.interviewLink} onChange={handleChange} placeholder="Interview Link (Zoom, Google Meet, etc.)" required />
        <button type="submit" className="submit-btn">Schedule Interview</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default InterviewScheduler;
