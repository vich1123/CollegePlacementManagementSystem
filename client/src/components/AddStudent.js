import React, { useState } from "react";
import { addStudent } from "../services/api";

function AddStudent() {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    resumeLink: "",
    course: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(student);
      setMessage("Student added successfully!");
      setStudent({ name: "", email: "", resumeLink: "", course: "" });
    } catch (error) {
      console.error(error);
      setMessage("Failed to add student.");
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            placeholder="Email"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="resumeLink">Resume Link</label>
          <input
            id="resumeLink"
            name="resumeLink"
            value={student.resumeLink}
            onChange={handleChange}
            placeholder="Resume Link"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="course">Course</label>
          <input
            id="course"
            name="course"
            value={student.course}
            onChange={handleChange}
            placeholder="Course"
            className="input-field"
          />
        </div>
        <button type="submit" className="button">Add Student</button>
      </form>
      {message && <p className="feedback-message text-green-500 text-center">{message}</p>}
    </div>
  );
}

export default AddStudent;
