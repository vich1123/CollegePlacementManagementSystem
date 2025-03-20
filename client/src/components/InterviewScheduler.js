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
  const fetchStudentId = async (email) => {
    try {
      const response = await axios.get(
        `/api/students/email/${encodeURIComponent(email)}`
      );

      if (response.data.success && response.data.student?.id) {
        return response.data.student.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching student ID:", error.response?.data || error.message);
      return null;
    }
  };

  // Function to fetch company ID using name
  const fetchCompanyId = async (companyName) => {
    try {
      const response = await axios.get(
        `/api/companies/name/${encodeURIComponent(companyName)}`
      );

      if (response.data.success && response.data.company?.id) {
        return response.data.company.id;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching company ID:", error.response?.data || error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      // Validate required fields before proceeding
      if (!formData.studentEmail || !formData.company || !formData.jobTitle || !formData.date || !formData.time) {
        setMessage("Please fill out all required fields.");
        setLoading(false);
        return;
      }

      // Get student ID and company ID
      const studentId = await fetchStudentId(formData.studentEmail);
      const companyId = await fetchCompanyId(formData.company);

      if (!studentId || !companyId) {
        setMessage("Invalid student email or company name. Please check and try again.");
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
        interviewLink: formData.interviewLink || "N/A", // Provide a default if empty
      };

      // Schedule the interview in the backend
      const response = await axios.post(
        "/api/interviews/schedule",
        interviewData
      );

      if (response.data.success) {
        setMessage(response.data.message || "Interview scheduled successfully!");

        // Send interview notification
        await axios.post(
          "/api/notifications/interview",
          {
            email: formData.studentEmail,
            interviewDate: formData.date,
            interviewTime: formData.time,
            companyName: formData.company,
            jobTitle: formData.jobTitle,
            interviewLink: formData.interviewLink || "N/A",
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
        setMessage("Failed to schedule the interview. Please try again.");
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
          type="email"
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
