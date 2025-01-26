import React, { useState } from "react";
import "./AddStudent.css";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    resumeLink: "",
    course: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5001/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        throw new Error(errorData.message || "Failed to add student");
      }

      const data = await response.json();
      setMessage("Student added successfully!");
      setStudent({ name: "", email: "", resumeLink: "", course: "" });
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage(error.message || "Error adding student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-student-container">
      <form className="add-student-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Student</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="resumeLink"
          placeholder="Resume Link"
          value={student.resumeLink}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course"
          value={student.course}
          onChange={handleChange}
          required
        />
        <button className="submit-button" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>
        {message && (
          <p className="form-message" style={{ color: message.includes("successfully") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddStudent;
