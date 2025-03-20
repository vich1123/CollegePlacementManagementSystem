import React, { useState } from "react";
import axios from "axios";

function InterviewScheduler() {
  const [formData, setFormData] = useState({
    studentEmail: "",
    studentId: "",
    company: "",
    companyId: "",
    jobTitle: "",
    date: "",
    time: "",
    interviewLink: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to fetch student ID using email
  const fetchStudentId = async () => {
    try {
      const response = await axios.get(
        `https://collegeplacementmanagementsystem-1.onrender.com/api/students/email/${encodeURIComponent(formData.studentEmail)}`
      );

      if (response.data.success && response.data.studentId) {
        return response.data.studentId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching student ID:", error);
      return null;
    }
  };

  // Function to fetch company ID using name
  const fetchCompanyId = async () => {
    try {
      const response = await axios.get(
        `https://collegeplacementmanagementsystem-1.onrender.com/api/companies/name/${encodeURIComponent(formData.company)}`
      );

      if (response.data.success && response.data.companyId) {
        return response.data.companyId;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching company ID:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Get student ID and company ID
      const studentId = await fetchStudentId();
      const companyId = await fetchCompanyId();

      if (!studentId || !companyId) {
        setMessage("Invalid student email or company name.");
        setLoading(false);
        return;
      }

      // Prepare interview scheduling data
      const interviewData = {
        studentId,
        companyId,
        jobTitle: formData.jobTitle,
        date: formData.date,
        time: formData.time,
        interviewLink: formData.interviewLink,
      };

      // Schedule the interview in the backend
      const response = await axios.post(
        "https://collegeplacementmanagementsystem-1.onrender.com/api/interviews/schedule",
        interviewData
      );

      if (response.data.success) {
        setMessage(response.data.message || "Interview scheduled successfully!");

        // Send interview notification
        await axios.post(
          "https://collegeplacementmanagementsystem-1.onrender.com/api/notifications/interview",
          {
            email: formData.studentEmail,
            interviewDate: formData.date,
            interviewTime: formData.time,
            companyName: formData.company,
            jobTitle: formData.jobTitle,
            interviewLink: formData.interviewLink,
          }
        );

        setMessage("Interview scheduled and notification sent successfully!");

        // Clear form fields after successful submission
        setFormData({
          studentEmail: "",
          studentId: "",
          company: "",
          companyId: "",
          jobTitle: "",
          date: "",
          time: "",
          interviewLink: "",
        });
      } else {
        setMessage("Failed to schedule the interview.");
      }
    } catch (error) {
      console.error("Error scheduling interview:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error scheduling interview.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSubmit}>
        <h2 className="form-title">Schedule an Interview</h2>

        <input
          name="studentEmail"
          value={formData.studentEmail}
          onChange={handleChange}
          placeholder="Student Email"
          required
        />
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          required
        />
        <input
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <input name="time" type="time" value={formData.time} onChange={handleChange} required />
        <input
          name="interviewLink"
          value={formData.interviewLink}
          onChange={handleChange}
          placeholder="Interview Link (Zoom, Google Meet, etc.)"
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Interview"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default InterviewScheduler;
