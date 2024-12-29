import React, { useState } from "react";

function AddApplication() {
  const [student, setStudent] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("submitted");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, company, status }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Application added successfully!");
        setStudent("");
        setCompany("");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Add Application</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={student}
          onChange={(e) => setStudent(e.target.value)}
          placeholder="Student ID"
          className="input"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company ID"
          className="input"
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="input">
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
