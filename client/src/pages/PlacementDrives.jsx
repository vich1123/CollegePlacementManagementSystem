import React, { useState, useEffect } from "react";
import { getPlacementDrives, updatePlacementDriveStatus } from "../services/api";

const PlacementDrives = () => {
  const [placements, setPlacements] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await getPlacementDrives();
      setPlacements(response.data);
    } catch (error) {
      console.error("Error fetching placements:", error);
      setError("Failed to fetch placement drives.");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updatePlacementDriveStatus(id, newStatus);
      fetchPlacements();
    } catch (error) {
      console.error("Error updating placement drive status:", error);
      setError("Error updating status.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Placement Drives</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.map((placement) => (
          <div key={placement._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{placement.title}</h3>
            <p className="text-gray-600">{placement.description}</p>
            <p className="mt-2 text-sm">Company: {placement.company.name}</p>
            <p className="mt-2 text-sm">Status: {placement.status}</p>
            <select
              className="mt-2 border p-1 rounded"
              value={placement.status}
              onChange={(e) => handleStatusChange(placement._id, e.target.value)}
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementDrives;
