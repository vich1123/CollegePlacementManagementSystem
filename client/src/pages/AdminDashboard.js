import React, { useState } from "react";
import AddStudent from "../components/AddStudent";

function AdminDashboard() {
  const [companyName, setCompanyName] = useState("");
  const [jobPostings, setJobPostings] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCompany = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName,
          jobPostings,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setCompanyName("");
        setJobPostings("");
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-600">Add Student</h2>
          <AddStudent />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-600">Admin Dashboard</h2>
          <form className="flex flex-col gap-4" onSubmit={handleAddCompany}>
            <div>
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Job Postings (comma-separated)
              </label>
              <input
                type="text"
                value={jobPostings}
                onChange={(e) => setJobPostings(e.target.value)}
                placeholder="e.g., Developer, Designer"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-purple-300 focus:border-purple-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            >
              Add Company
            </button>
            {message && <p className="mt-4 text-center text-sm">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
