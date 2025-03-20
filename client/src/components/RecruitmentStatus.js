import React, { useState, useEffect } from "react";
import { fetchRecruitmentStatusHistory, createRecruitmentStatus } from "../services/api";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

function RecruitmentStatus() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    studentsPlaced: "",
    offersMade: "",
    companiesParticipated: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadRecruitmentStatus();
  }, []);

  const loadRecruitmentStatus = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchRecruitmentStatusHistory();

      if (result?.success && result.data.length > 0) {
        const labels = result.data.map((entry) => new Date(entry.createdAt).toLocaleDateString());

        setChartData({
          labels,
          datasets: [
            {
              label: "Students Placed",
              data: result.data.map((entry) => entry.studentsPlaced),
              borderColor: "blue",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: true,
            },
            {
              label: "Offers Made",
              data: result.data.map((entry) => entry.offersMade),
              borderColor: "green",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
            {
              label: "Companies Participated",
              data: result.data.map((entry) => entry.companiesParticipated),
              borderColor: "orange",
              backgroundColor: "rgba(255, 159, 64, 0.2)",
              fill: true,
            },
          ],
        });
      } else {
        setError("No recruitment data available.");
        setChartData(null);
      }
    } catch (err) {
      console.error("Error fetching recruitment status:", err);
      setError("Error loading data.");
      setChartData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const formattedData = {
      studentsPlaced: Number(formData.studentsPlaced),
      offersMade: Number(formData.offersMade),
      companiesParticipated: Number(formData.companiesParticipated),
    };

    if (
      formattedData.studentsPlaced <= 0 ||
      formattedData.offersMade <= 0 ||
      formattedData.companiesParticipated <= 0
    ) {
      setError("All fields are required and must be positive numbers.");
      return;
    }

    try {
      await createRecruitmentStatus(formattedData);
      setMessage("Recruitment status added successfully!");
      setFormData({ studentsPlaced: "", offersMade: "", companiesParticipated: "" });
      loadRecruitmentStatus(); // Reload chart data
    } catch (err) {
      console.error("Error adding recruitment status:", err);
      setError("Failed to add recruitment status.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Recruitment Status Trends</h2>

        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Recruitment Status</h3>
          <input
            type="number"
            name="studentsPlaced"
            value={formData.studentsPlaced}
            onChange={handleChange}
            placeholder="Students Placed"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="offersMade"
            value={formData.offersMade}
            onChange={handleChange}
            placeholder="Offers Made"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="companiesParticipated"
            value={formData.companiesParticipated}
            onChange={handleChange}
            placeholder="Companies Participated"
            className="w-full mb-2 p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Submit
          </button>
        </form>

        {message && <p className="text-center text-green-500">{message}</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {loading ? <p className="text-center text-gray-700">Loading...</p> : null}
        {!loading && chartData && (
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruitmentStatus;
