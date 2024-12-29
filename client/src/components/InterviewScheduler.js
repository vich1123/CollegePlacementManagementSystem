import React, { useState, useEffect } from "react";
import { fetchInterviews, scheduleInterview } from "../services/api";

function InterviewScheduler() {
  const [interviews, setInterviews] = useState([]);
  const [newInterview, setNewInterview] = useState({ studentName: "", companyName: "", date: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const response = await fetchInterviews();
        setInterviews(response.data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };
    getInterviews();
  }, []);

  const handleChange = (e) => {
    setNewInterview({ ...newInterview, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await scheduleInterview(newInterview);
      setMessage("Interview scheduled successfully!");
      setNewInterview({ studentName: "", companyName: "", date: "" });
      const response = await fetchInterviews();
      setInterviews(response.data);
    } catch (error) {
      console.error("Error scheduling interview:", error);
      setMessage("Failed to schedule interview.");
    }
  };

  return (
    <div>
      <h2>Interview Scheduler</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentName" value={newInterview.studentName} onChange={handleChange} placeholder="Student Name" />
        <input name="companyName" value={newInterview.companyName} onChange={handleChange} placeholder="Company Name" />
        <input type="date" name="date" value={newInterview.date} onChange={handleChange} />
        <button type="submit">Schedule Interview</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id}>
            <p><strong>Student:</strong> {interview.studentName}</p>
            <p><strong>Company:</strong> {interview.companyName}</p>
            <p><strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InterviewScheduler;
