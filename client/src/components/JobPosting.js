import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

function JobPosting() {
  const [formData, setFormData] = useState({ title: "", company: "", description: "", requirements: "" });
  const [message, setMessage] = useState("");
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      setJobListings(response.data.data || []);
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
      const response = await axios.post(`${API_BASE_URL}/jobs`, formData);
      setMessage(response.data.message || "Job posted successfully!");
      setJobListings([...jobListings, response.data.data]);
      setFormData({ title: "", company: "", description: "", requirements: "" });
    } catch (error) {
      console.error("Error posting job:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error posting job.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Job Title" required />
        <input name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Job Description" required />
        <input name="requirements" value={formData.requirements} onChange={handleChange} placeholder="Job Requirements" required />
        <button type="submit">Post Job</button>
        {message && <p>{message}</p>}
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
