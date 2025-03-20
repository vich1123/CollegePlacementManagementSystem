import React, { useState, useEffect } from "react";
import { createPlacementDrive, getCompanies } from "../services/api";
import "./PlacementDrive.css";

function PlacementDrive() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyId: "",
    status: "Upcoming",
  });

  const [companies, setCompanies] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ** Fetch Companies on Component Load **
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        if (response?.success && Array.isArray(response.data)) {
          setCompanies(response.data);
        } else {
          setCompanies([]); // Ensures no undefined errors
          setError("No companies found.");
        }
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError("Failed to load companies.");
        setCompanies([]); // Ensure it's an empty array if there's an error
      }
    };

    fetchCompanies();
  }, []);

  // ** Handle Form Input Changes **
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ** Handle Form Submission **
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!formData.companyId) {
      setError("Company ID is required.");
      return;
    }

    try {
      const response = await createPlacementDrive(formData);
      if (response?.success) {
        setMessage("Placement drive created successfully!");
        setFormData({ title: "", description: "", companyId: "", status: "Upcoming" });
      } else {
        setError(response?.message || "Failed to create placement drive.");
      }
    } catch (err) {
      console.error("Error creating placement drive:", err);
      setError(err.response?.data?.message || "Error creating placement drive.");
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
          {companies.length > 0 ? (
            companies.map((company) => (
              <option key={company._id} value={company._id}>
                {company.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No companies available</option>
          )}
        </select>

        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
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
