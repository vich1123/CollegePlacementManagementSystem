import React, { useState } from "react";
import "./AddApplication.css";

const AddApplication = () => {
  const [application, setApplication] = useState({
    studentName: "",
    jobTitle: "",
    companyName: "",
    resumeLink: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://collegeplacementmanagementsystem-1.onrender.com/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      setMessage("Application submitted successfully!");
      setApplication({ studentName: "", jobTitle: "", companyName: "", resumeLink: "" });
    } catch (error) {
      console.error("Error submitting application:", error);
      setMessage("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Submit Job Application</h2>
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={application.studentName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={application.jobTitle}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={application.companyName}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="resumeLink"
          placeholder="Resume Link"
          value={application.resumeLink}
          onChange={handleChange}
          required
        />
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddApplication;
