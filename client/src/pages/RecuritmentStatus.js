import React, { useState, useEffect } from "react";
import { fetchRecruitmentStatus } from "../services/api";

function RecruitmentStatus() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecruitmentStatus = async () => {
      try {
        const result = await fetchRecruitmentStatus();
        if (result?.success && result.data) {
          setData(result.data);
        } else {
          setData(null);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching recruitment status:", err);
        setError(err.message || "Failed to fetch recruitment status.");
      } finally {
        setLoading(false);
      }
    };

    loadRecruitmentStatus();
  }, []);

  if (loading) return <p className="text-gray-700">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Recruitment Status</h2>
      {data ? (
        <div className="p-4 bg-white rounded-lg shadow-md">
          <p><strong>Students Placed:</strong> {data.studentsPlaced || "N/A"}</p>
          <p><strong>Offers Made:</strong> {data.offersMade || "N/A"}</p>
          <p><strong>Companies Participated:</strong> {data.companiesParticipated || "N/A"}</p>
        </div>
      ) : (
        <p className="text-gray-700">No recruitment data available.</p>
      )}
    </div>
  );
}

export default RecruitmentStatus;
