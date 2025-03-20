import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
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
import { getStudents } from "./services/api"; // Fetch student data
import "./App.css";

// 404 Page Component
const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <Link to="/admin-dashboard">Go to Admin Panel</Link>
  </div>
);

function App() {
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch first available student ID
  useEffect(() => {
    const fetchStudentId = async () => {
      try {
        const response = await getStudents();
        if (response.success && response.data.length > 0) {
          setStudentId(response.data[0]._id); // Use first student's ID
        } else {
          console.warn("No students found in the database.");
        }
      } catch (error) {
        console.error("Error fetching student ID:", error);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentId();
  }, []);

  return (
    <Router>
      <header className="navbar">
        <h1 className="navbar-title">COLLEGE PLACEMENT MANAGEMENT SYSTEM</h1>
        <nav className="menu">
          {loading ? (
            <span className="menu-item disabled">Loading...</span>
          ) : studentId ? (
            <Link to={`/student-dashboard/${studentId}`} className="menu-item">
              Student Dashboard
            </Link>
          ) : (
            <span className="menu-item disabled">Student Dashboard (No Data)</span>
          )}
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
        {error && <p className="error-message">Error: {error}</p>}
        <Routes>
          <Route path="/" element={<Navigate to="/admin-dashboard" replace />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
