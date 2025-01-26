import React, { useState, useEffect } from "react";
import { fetchRecruitmentStatus } from "../services/api"; // Use centralized API utility

function RecruitmentStatus() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecruitmentStatus = async () => {
      try {
        const result = await fetchRecruitmentStatus(); // Fetch data from API service
        setData(result);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error("Error fetching recruitment status:", err);
        setError(err.message || "Failed to fetch recruitment status.");
      } finally {
        setLoading(false); // Stop loading after data fetch
      }
    };

    loadRecruitmentStatus();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>; // Display error message
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Recruitment Status</h2>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item) => (
            <div key={item._id} className="p-4 bg-white rounded-lg shadow-md">
              <p>
                <strong>Student:</strong> {item.studentName || "N/A"}
              </p>
              <p>
                <strong>Company:</strong> {item.companyName || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {item.status || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No recruitment data available.</p>
      )}
    </div>
  );
}

export default RecruitmentStatus;
