import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from "../services/api";

const StudentDashboard = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    if (!studentId) {
      console.error("No studentId provided.");
      setError("Student ID is missing.");
      setLoading(false);
      return;
    }

    const formattedId = studentId.trim();
    if (formattedId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(formattedId)) {
      console.error("Invalid student ID format:", formattedId);
      setError("Invalid student ID format.");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await getStudentById(formattedId);
        if (!response || response.success === false || !response.data) {
          setError(response?.message || "Student not found.");
        } else {
          setStudent(response.data);
          setApplications(response.data.applications || []);
          setInterviews(response.data.interviews || []);
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Error fetching student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  return (
    <div>
      <h2>Student Dashboard</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && student && (
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <h3>My Applications</h3>
          <ul>
            {applications.map((app) => (
              <li key={app._id}>{app.jobTitle} - {app.status}</li>
            ))}
          </ul>
          <h3>My Interviews</h3>
          <ul>
            {interviews.map((interview) => (
              <li key={interview._id}>{interview.date} at {interview.time} - {interview.status}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;