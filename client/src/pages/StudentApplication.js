import React, { useState } from "react";
import axios from "axios";

const StudentApplication = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
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

    // Basic input validation
    if (!formData.name || !formData.email || !formData.resume) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/students", formData);
      setMessage("Application submitted successfully!");
      setFormData({ name: "", email: "", resume: "" }); // Clear the form
    } catch (err) {
      console.error("Error submitting application:", err);
      setError("Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white shadow-md rounded-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Student Application</h2>

        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="resume" className="block text-gray-700 mb-2">
            Resume URL
          </label>
          <input
            id="resume"
            name="resume"
            type="text"
            value={formData.resume}
            onChange={handleChange}
            placeholder="Paste your resume link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentApplication;
