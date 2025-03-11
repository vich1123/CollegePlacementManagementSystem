import React, { useState } from "react";
import { createRecruitmentStatus } from "../services/api";

function RecruitmentStatusForm({ onStatusAdded }) {
  const [formData, setFormData] = useState({
    studentsPlaced: "",
    offersMade: "",
    companiesParticipated: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await createRecruitmentStatus(formData);
      setMessage("Recruitment status added successfully!");
      setFormData({ studentsPlaced: "", offersMade: "", companiesParticipated: "" });
      onStatusAdded(); // Refresh the chart
    } catch (err) {
      console.error("Error adding recruitment status:", err);
      setError("Failed to add recruitment status.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-4">Add Recruitment Status</h2>
      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="number" name="studentsPlaced" value={formData.studentsPlaced} onChange={handleChange} placeholder="Students Placed" required className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="offersMade" value={formData.offersMade} onChange={handleChange} placeholder="Offers Made" required className="w-full p-2 border border-gray-300 rounded" />
        <input type="number" name="companiesParticipated" value={formData.companiesParticipated} onChange={handleChange} placeholder="Companies Participated" required className="w-full p-2 border border-gray-300 rounded" />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>
    </div>
  );
}

export default RecruitmentStatusForm;
