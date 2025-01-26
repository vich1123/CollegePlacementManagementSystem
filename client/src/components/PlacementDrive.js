import React, { useState } from "react";
import { createPlacementDrive } from "../services/api";

function PlacementDrive() {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlacementDrive(formData);
      setMessage("Placement drive created successfully!");
      setFormData({ title: "", description: "" });
    } catch (error) {
      setMessage("Error creating placement drive.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Create Placement Drive</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="input"
        />
        <button type="submit" className="btn">
          Create Placement Drive
        </button>
        {message && <p className="text-red-500">{message}</p>}
      </form>
    </div>
  );
}

export default PlacementDrive;
