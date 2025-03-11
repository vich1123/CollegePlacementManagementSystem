import React, { useState } from "react";
import "./AddStudent.css"; // Ensure CSS file is linked properly

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    resumeLink: "",
    course: "",
    academicRecords: [],
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddRecord = () => {
    setStudent({
      ...student,
      academicRecords: [
        ...student.academicRecords,
        { subject: "", grade: "", transcriptLink: "" },
      ],
    });
  };

  const handleRecordChange = (index, field, value) => {
    const newRecords = [...student.academicRecords];
    newRecords[index][field] = value;
    setStudent({ ...student, academicRecords: newRecords });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://collegeplacementmanagementsystem-1.onrender.com/api/students",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(student),
        }
      );

      if (!response.ok) throw new Error("Failed to add student");

      setMessage("Student added successfully!");
      setStudent({
        name: "",
        email: "",
        resumeLink: "",
        course: "",
        academicRecords: [],
      });
    } catch (error) {
      console.error("Error adding student:", error);
      setMessage("Error adding student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      {/* Centered Form Only (Illustration Removed) */}
      <form className="form-box" onSubmit={handleSubmit}>
        <h2 className="form-title">Add Student</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={student.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={student.email}
          onChange={handleChange}
          required
        />
        <input
          type="url"
          name="resumeLink"
          placeholder="Resume Link (URL)"
          value={student.resumeLink}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="course"
          placeholder="Course Enrolled"
          value={student.course}
          onChange={handleChange}
          required
        />

        <h3 className="section-title">Academic Records</h3>
        {student.academicRecords.map((record, index) => (
          <div key={index} className="record-container">
            <input
              type="text"
              placeholder="Subject"
              value={record.subject}
              onChange={(e) =>
                handleRecordChange(index, "subject", e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Grade"
              value={record.grade}
              onChange={(e) =>
                handleRecordChange(index, "grade", e.target.value)
              }
            />
            <input
              type="url"
              placeholder="Transcript Link"
              value={record.transcriptLink}
              onChange={(e) =>
                handleRecordChange(index, "transcriptLink", e.target.value)
              }
            />
          </div>
        ))}

        <button type="button" onClick={handleAddRecord} className="add-btn">
          Add Academic Record
        </button>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Student"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AddStudent;
