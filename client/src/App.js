import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import CompanyDashboard from "./components/CompanyDashboard";
import Reports from "./components/Reports";
import RecruitmentStatus from "./components/RecruitmentStatus";
import ResumeUpload from "./components/ResumeUpload";
import AddStudent from "./components/AddStudent";
import AddCompany from "./components/AddCompany";
import PlacementDrive from "./components/PlacementDrive";
import JobPosting from "./components/JobPosting";
import InterviewScheduler from "./components/InterviewScheduler";
import StudentApplications from "./pages/StudentApplications";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <h1 className="navbar-title">COLLEGE PLACEMENT MANAGEMENT SYSTEM</h1>
        <nav className="menu">
          <Link to="/student-dashboard/676fca128068ea4f4e6a6371d" className="menu-item">
            Student Dashboard
          </Link>
          <Link to="/company-dashboard" className="menu-item">Company Dashboard</Link>
          <Link to="/admin-dashboard" className="menu-item">Admin Panel</Link>
          <Link to="/recruitment-status" className="menu-item">Recruitment Status</Link>
          <Link to="/reports" className="menu-item">Reports</Link>
          <Link to="/resume-upload" className="menu-item">Resume Upload</Link>
          <Link to="/add-company" className="menu-item">Add Company</Link>
          <Link to="/job-posting" className="menu-item">Post Job</Link>
          <Link to="/interview-scheduler" className="menu-item">Schedule Interview</Link>
          <Link to="/student-applications" className="menu-item">My Applications</Link>
        </nav>
      </header>

      <main className="content-container">
        <Routes>
          <Route path="/student-dashboard/:studentId" element={<StudentDashboard />} />
          <Route path="/company-dashboard" element={<CompanyDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/recruitment-status" element={<RecruitmentStatus />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/placements" element={<PlacementDrive />} />
          <Route path="/job-posting" element={<JobPosting />} />
          <Route path="/interview-scheduler" element={<InterviewScheduler />} />
          <Route path="/student-applications" element={<StudentApplications />} />
          <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;