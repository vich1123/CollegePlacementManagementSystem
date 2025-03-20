import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentApplications = () => {
  const { studentId: paramStudentId } = useParams(); // Extract studentId from URL
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedStudentId = localStorage.getItem("studentId");
    const validStudentId = paramStudentId || storedStudentId;

    if (!validStudentId) {
      setError("Student ID is missing.");
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/applications/student/${validStudentId}`
        );
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
        setError("Failed to load applications. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [paramStudentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Job Applications</h2>

      {loading ? (
        <p className="text-gray-500">Loading applications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500">No job applications found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Company</th>
              <th className="border border-gray-300 px-4 py-2">Job Title</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Applied On</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="border border-gray-300 px-4 py-2">{app.company?.name || "N/A"}</td>
                <td className="border border-gray-300 px-4 py-2">{app.jobTitle}</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-blue-500">{app.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentApplications;
