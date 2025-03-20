import React, { useEffect, useState } from 'react';
import { getReports } from '../services/reports';

const PlacementReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getReports();
        if (result.success) {
          setReports(result.data);
        } else {
          setError("No placement reports available.");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Placement Reports</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        <ul className="divide-y divide-gray-300">
          {reports.map((report) => (
            <li key={report._id} className="p-4">
              <p className="text-lg font-semibold">{report.title}</p>
              <p className="text-gray-600">{report.studentsPlaced} students placed</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlacementReports;
