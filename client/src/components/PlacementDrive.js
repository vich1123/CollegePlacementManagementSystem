import React, { useState, useEffect } from "react";
import { createPlacementDrive, getCompanies } from "../services/api";
import "./PlacementDrive.css";

function PlacementDrive() {
  const [formData, setFormData] = useState({ title: "", description: "", companyId: "" });
  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies.");
      }
    };
    fetchCompanies();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.companyId) {
      setError("Company ID is required.");
      return;
    }

    try {
      await createPlacementDrive(formData);
      setMessage("Placement drive created successfully!");
      setFormData({ title: "", description: "", companyId: "" });
    } catch (error) {
      console.error("Error creating placement drive:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error creating placement drive.");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-box">
        <h2 className="form-title">Create Placement Drive</h2>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select name="companyId" value={formData.companyId} onChange={handleChange} required>
          <option value="">Select a Company</option>
          {companies.map((company) => (
            <option key={company._id} value={company._id}>{company.name}</option>
          ))}
        </select>
        <button type="submit" className="submit-button">
          Create Placement Drive
        </button>
        {message && <p className="form-message text-green-500">{message}</p>}
        {error && <p className="form-message text-red-500">{error}</p>}
      </form>
    </div>
  );
}

export default PlacementDrive;
