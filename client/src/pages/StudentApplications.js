import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentApplications = ({ studentId }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(`/api/applications/student/${studentId}`);
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };
    fetchApplications();
  }, [studentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Job Applications</h2>
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
              <td className="border border-gray-300 px-4 py-2">{new Date(app.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentApplications;
