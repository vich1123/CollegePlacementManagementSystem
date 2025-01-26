import React, { useState } from "react";
import { scheduleInterview } from "../services/api";

function InterviewScheduler() {
  const [formData, setFormData] = useState({
    student: "",
    company: "",
    date: "",
    time: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scheduleInterview(formData);
      setMessage("Interview scheduled successfully!");
      setFormData({ student: "", company: "", date: "", time: "" });
    } catch (error) {
      setMessage("Error scheduling interview. Please try again.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Schedule Interview</h2>
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
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="btn">
          Schedule Interview
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}

export default InterviewScheduler;
