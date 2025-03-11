import React, { useState, useEffect } from "react";
import { getPlacements } from "../api/placementDrives";

const PlacementDrives = () => {
  const [placements, setPlacements] = useState([]);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await getPlacements();
      setPlacements(response.data);
    } catch (error) {
      console.error("Error fetching placements:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Placement Drives</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placements.map((placement) => (
          <div key={placement._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{placement.title}</h3>
            <p className="text-gray-600">{placement.description}</p>
            <p className="mt-2 text-sm">Status: {placement.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacementDrives;
