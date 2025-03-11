import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">College Placement System</h1>
      <div className="dashboard-links">
        <Link to="/add-student" className="dashboard-link">
          Add Student
        </Link>
        <Link to="/add-company" className="dashboard-link">
          Add Company
        </Link>
        <Link to="/placement-drive" className="dashboard-link">
          Placement Drives
        </Link>
        <Link to="/recruitment-status" className="dashboard-link">
          Recruitment Status
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
