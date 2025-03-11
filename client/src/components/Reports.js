import React, { useEffect, useState } from "react";
import { fetchReports } from "../services/api";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchReports();
        console.log("Reports API Response:", result);

        if (result?.success && result.data.length > 0) {
          setData(result.data[0]);  
        } else {
          setError("No report data available.");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const chartData = data
    ? {
        labels: ["Total Students", "Students Placed", "Offers Made", "Companies Participated"],
        datasets: [
          {
            label: "Recruitment Statistics",
            data: [
              data.totalStudents,
              data.studentsPlaced,
              data.offersMade,
              data.companiesParticipated
            ],
            backgroundColor: ["blue", "green", "yellow", "orange"],
          },
        ],
      }
    : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Recruitment Reports</h2>
        {loading && <p className="text-center text-gray-700">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && chartData && (
          <div style={{ height: "400px" }}> 
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
