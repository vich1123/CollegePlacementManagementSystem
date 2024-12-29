import React, { useState, useEffect } from "react";
import { fetchPlacementDrives, addPlacementDrive } from "../services/api";

function PlacementDrive() {
  const [drives, setDrives] = useState([]);
  const [newDrive, setNewDrive] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getDrives = async () => {
      try {
        const response = await fetchPlacementDrives();
        setDrives(response.data);
      } catch (error) {
        console.error("Error fetching placement drives:", error);
      }
    };
    getDrives();
  }, []);

  const handleChange = (e) => {
    setNewDrive({ ...newDrive, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlacementDrive(newDrive);
      setMessage("Placement drive added successfully!");
      setNewDrive({ title: "", description: "" });
      const response = await fetchPlacementDrives();
      setDrives(response.data);
    } catch (error) {
      console.error("Error adding placement drive:", error);
      setMessage("Failed to add placement drive.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Placement Drives</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={newDrive.title}
          onChange={handleChange}
          placeholder="Title"
          className="input-field"
        />
        <textarea
          name="description"
          value={newDrive.description}
          onChange={handleChange}
          placeholder="Description"
          className="input-field h-24"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
        >
          Add Drive
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
      <ul className="mt-6 space-y-4">
        {drives.map((drive) => (
          <li
            key={drive._id}
            className="bg-gray-100 p-4 shadow rounded hover:bg-gray-200"
          >
            <h3 className="font-semibold text-lg">{drive.title}</h3>
            <p>{drive.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlacementDrive;
