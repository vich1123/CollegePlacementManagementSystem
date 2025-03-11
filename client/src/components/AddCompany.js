import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../services/api";
import "./AddCompany.css";

function AddCompany() {
  const [formData, setFormData] = useState({
    name: "",
    jobPostings: "",
    contactEmail: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Company name is required.");
      return false;
    }
    if (!formData.contactEmail.trim()) {
      setError("Contact email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateForm()) return;

    try {
      // Ensure jobPostings is always an array
      const jobPostings =
        formData.jobPostings.trim() !== ""
          ? formData.jobPostings.split(",").map((job) => job.trim())
          : [];

      // Prepare data for API submission
      const companyData = {
        name: formData.name.trim(),
        contactEmail: formData.contactEmail.trim().toLowerCase(),
        jobPostings,
      };

      console.log("Submitting Company Data:", companyData);

      // Make API request to add company
      const response = await createCompany(companyData);

      console.log("API Response:", response);

      if (response.success) {
        setMessage("Company added successfully!");
        setTimeout(() => navigate("/company-dashboard"), 1500);

        // Reset form only on success
        setFormData({ name: "", jobPostings: "", contactEmail: "" });
      } else {
        setError(response.message || "Failed to add company.");
      }
    } catch (error) {
      console.error("Error adding company:", error.response?.data || error.message);

      if (error.response?.data?.message?.includes("E11000 duplicate key error")) {
        setError("A company with this name or email already exists.");
      } else {
        setError(error.response?.data?.message || "An error occurred while adding the company.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Add Company</h2>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Company Name"
          required
          className="input-field"
        />

        <input
          name="jobPostings"
          value={formData.jobPostings}
          onChange={handleChange}
          placeholder="Job Postings (comma-separated)"
          className="input-field"
        />

        <input
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="Contact Email"
          type="email"
          required
          className="input-field"
        />

        <button type="submit" className="submit-button">
          Add Company
        </button>

        {message && <p className="form-message text-green-500">{message}</p>}
        {error && <p className="form-message text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default AddCompany;
