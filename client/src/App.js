import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import AddCompany from "./components/AddCompany";
import PlacementDrive from "./components/PlacementDrive";
import RecruitmentStatus from "./components/RecruitmentStatus";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <nav className="bg-gradient-to-r from-purple-700 to-purple-900 shadow-lg p-4 flex justify-around">
          <Link to="/" className="nav-link text-lg font-semibold hover:bg-purple-500 px-4 py-2 rounded-md">Dashboard</Link>
          <Link to="/add-company" className="nav-link text-lg font-semibold hover:bg-purple-500 px-4 py-2 rounded-md">Add Company</Link>
          <Link to="/placements" className="nav-link text-lg font-semibold hover:bg-purple-500 px-4 py-2 rounded-md">Placement Drives</Link>
          <Link to="/recruitment-status" className="nav-link text-lg font-semibold hover:bg-purple-500 px-4 py-2 rounded-md">Recruitment Status</Link>
        </nav>

        <div className="container mx-auto p-10">
          <Routes>
            <Route path="/" element={<AddStudent />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/placements" element={<PlacementDrive />} />
            <Route path="/recruitment-status" element={<RecruitmentStatus />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
