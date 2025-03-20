import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStudentById } from "../services/api";

const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

const StudentDashboard = () => {
  const { studentId: paramStudentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applications, setApplications] = useState([]);
  const [academicRecords, setAcademicRecords] = useState([]);

  useEffect(() => {
    // Retrieve student ID from local storage or URL
    let storedStudentId = localStorage.getItem("studentId");
    let validStudentId = paramStudentId || storedStudentId;

    if (!validStudentId) {
      setError("Error: Student ID is missing.");
      setLoading(false);
      return;
    }

    if (!isValidObjectId(validStudentId.trim())) {
      setError("Error: Invalid student ID format.");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await getStudentById(validStudentId);
        console.log("API Response:", response);

        if (!response || !response.success || !response.data) {
          setError("Student not found in the database.");
        } else {
          setStudent(response.data);
          setApplications(response.data.applications || []);
          setAcademicRecords(response.data.academicRecords || []);
          localStorage.setItem("studentId", response.data._id); // Store student ID in localStorage
        }
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Error: Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [paramStudentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Dashboard</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && student && (
        <div>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <h3 className="text-xl mt-4 font-semibold">My Applications</h3>
          {applications.length > 0 ? (
            <ul className="list-disc ml-6">
              {applications.map((app) => (
                <li key={app._id}>
                  {app.jobTitle} at <strong>{app.company?.name || "Unknown Company"}</strong> -{" "}
                  <strong>{app.status}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>No applications found.</p>
          )}

          <h3 className="text-xl mt-4 font-semibold">Academic Records</h3>
          {academicRecords.length > 0 ? (
            <ul className="list-disc ml-6">
              {academicRecords.map((record, index) => (
                <li key={index}>
                  <strong>Grades:</strong>{" "}
                  {record.grades.length > 0
                    ? record.grades.map((g) => `${g.subject}: ${g.score}`).join(", ")
                    : "N/A"}{" "}
                  <br />
                  <strong>Achievements:</strong>{" "}
                  {record.achievements.length > 0
                    ? record.achievements.join(", ")
                    : "N/A"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No academic records found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
