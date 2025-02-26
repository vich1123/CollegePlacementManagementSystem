import React, { useState } from "react";
import axios from "axios";

function AddCompany() {
  const [formData, setFormData] = useState({ name: "", jobPostings: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jobPostings = formData.jobPostings.split(",").map((job) => job.trim());
      if (!formData.name || jobPostings.length === 0 || !jobPostings[0]) {
        throw new Error("All fields are required.");
      }
      const response = await axios.post("https://collegeplacementmanagementsystem-1.onrender.com/api/companies", {
        ...formData,
        jobPostings,
      });
      setMessage(response.data.message || "Company added successfully!");
      setFormData({ name: "", jobPostings: "" });
    } catch (error) {
      console.error("Error adding company:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Error adding company.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Add Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="input-field"
        />
        <input
          name="jobPostings"
          value={formData.jobPostings}
          onChange={handleChange}
          placeholder="Job Postings (comma-separated)"
          className="input-field"
        />
        <button type="submit" className="button">
          Add Company
        </button>
        {message && <p className="text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
}

export default AddCompany;