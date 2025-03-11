import React from "react";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link to="/add-student" className="p-4 bg-blue-500 text-white rounded-md text-center">
          Manage Students
        </Link>
        <Link to="/add-company" className="p-4 bg-green-500 text-white rounded-md text-center">
          Manage Companies
        </Link>
        <Link to="/placements" className="p-4 bg-yellow-500 text-white rounded-md text-center">
          Manage Placement Drives
        </Link>
        <Link to="/recruitment-status" className="p-4 bg-purple-500 text-white rounded-md text-center">
          View Recruitment Statistics
        </Link>
        <Link to="/reports" className="p-4 bg-red-500 text-white rounded-md text-center">
          Generate Reports
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
