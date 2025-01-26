import React, { useState } from "react";
import { addApplication } from "../services/api";

function AddApplication() {
  const [formData, setFormData] = useState({
    student: "",
    company: "",
    status: "submitted",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.student || !formData.company) {
      setMessage("Please fill in all fields.");
      return;
    }
    try {
      await addApplication(formData);
      setMessage("Application added successfully!");
      setFormData({ student: "", company: "", status: "submitted" });
    } catch (error) {
      setMessage("Error adding application. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="student"
          value={formData.student}
          onChange={handleChange}
          placeholder="Student ID"
          className="input"
        />
        <input
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company ID"
          className="input"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="input"
        >
          <option value="submitted">Submitted</option>
          <option value="reviewed">Reviewed</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
        </select>
        <button type="submit" className="btn">
          Add Application
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}

export default AddApplication;