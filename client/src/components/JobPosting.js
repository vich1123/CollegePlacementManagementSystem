import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://collegeplacementmanagementsystem-1.onrender.com/api";

function JobPosting() {
  const [formData, setFormData] = useState({ title: "", company: "", description: "" });
  const [message, setMessage] = useState("");
  const [jobListings, setJobListings] = useState([]);

  // Fetch existing jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      setJobListings(response.data.jobs || []);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
      setMessage("Failed to fetch job listings.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting job:", formData);
      const response = await axios.post(`${API_BASE_URL}/jobs`, formData);
      console.log("Job posted successfully:", response.data);
      setMessage(response.data.message || "Job posted successfully!");
      setJobListings([...jobListings, response.data.job]);
      setFormData({ title: "", company: "", description: "" });
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error posting job.");
    }
  };

  return (
    <div className="form-container">
      <form className="form-content" onSubmit={handleSubmit}>
        <h2 className="form-title">Post a Job</h2>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required />
        <button type="submit" className="submit-btn">Post Job</button>
        {message && <p className="message">{message}</p>}
      </form>

      <h3>Existing Job Listings</h3>
      <ul>
        {jobListings.map((job) => (
          <li key={job._id}>{job.title} at {job.company} - {job.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default JobPosting;
