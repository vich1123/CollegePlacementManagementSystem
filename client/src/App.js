import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddStudent from "./components/AddStudent";
import AddCompany from "./components/AddCompany";
import PlacementDrive from "./components/PlacementDrive";
import RecruitmentStatus from "./components/RecruitmentStatus";
import "./App.css"; // Custom styles

function App() {
  return (
    <Router>
      <div className="main-container">
        {/* Navbar */}
        <header className="navbar">
          <h1 className="navbar-title">COLLEGE PLACEMENT MANAGEMENT SYSTEM</h1>
          <nav className="menu">
            <Link to="/" className="menu-item">
              DASHBOARD
            </Link>
            <Link to="/add-company" className="menu-item">
              ADD COMPANY
            </Link>
            <Link to="/placements" className="menu-item">
              PLACEMENT DRIVES
            </Link>
            <Link to="/recruitment-status" className="menu-item">
              RECRUITMENT STATUS
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <div className="content-container">
          <div className="image-container">
            <img
              src={require("./Graduate students studying business administration 1.png")}
              alt="MBA illustration"
              className="illustration"
            />
          </div>
          <div className="form-container">
            <Routes>
              <Route path="/" element={<AddStudent />} />
              <Route path="/add-company" element={<AddCompany />} />
              <Route path="/placements" element={<PlacementDrive />} />
              <Route path="/recruitment-status" element={<RecruitmentStatus />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
