import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const API_BASE_URL = "http://localhost:5001/api/reports";

function Reports() {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        console.log("Reports API Response:", response.data);

        if (response.data.success && response.data.data.length > 0) {
          setReports(response.data.data);
          setSelectedReport(response.data.data[0]); // Default to first report
        } else {
          setError("No report data available.");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to fetch reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const handleReportChange = (event) => {
    const report = reports.find((r) => r._id === event.target.value);
    setSelectedReport(report);
  };

  const barChartData = selectedReport
    ? {
        labels: ["Total Students", "Students Placed", "Offers Made", "Companies Participated"],
        datasets: [
          {
            label: "Placement Statistics",
            data: [
              selectedReport.totalStudents,
              selectedReport.studentsPlaced,
              selectedReport.offersMade,
              selectedReport.companiesParticipated,
            ],
            backgroundColor: ["blue", "green", "yellow", "orange"],
          },
        ],
      }
    : null;

  const pieChartData = selectedReport
    ? {
        labels: ["Students Placed", "Not Placed"],
        datasets: [
          {
            label: "Placement Distribution",
            data: [selectedReport.studentsPlaced, selectedReport.totalStudents - selectedReport.studentsPlaced],
            backgroundColor: ["green", "red"],
          },
        ],
      }
    : null;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Recruitment Reports</h2>

        {loading && <p className="text-center text-gray-700">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && reports.length > 0 && (
          <div className="mb-4">
            <label className="block font-semibold mb-2">Select Report:</label>
            <select onChange={handleReportChange} className="border p-2 w-full rounded">
              {reports.map((report) => (
                <option key={report._id} value={report._id}>
                  {report.title} ({report.year})
                </option>
              ))}
            </select>
          </div>
        )}

        {!loading && selectedReport && (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-center">{selectedReport.title} - {selectedReport.year}</h3>

            <div style={{ height: "300px", marginBottom: "30px" }}>
              <Bar data={barChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <div style={{ height: "300px" }}>
              <Pie data={pieChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;
