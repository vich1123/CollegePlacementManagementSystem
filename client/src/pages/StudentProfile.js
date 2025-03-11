import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [academicRecord, setAcademicRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setStudent(response.data.data.student);

        // Fetch academic records
        const academicResponse = await axios.get(`/api/academicRecords/${studentId}`);
        setAcademicRecord(academicResponse.data.data);
      } catch (error) {
        console.error("Error fetching student profile", error);
        setError("Failed to fetch student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Student Profile</h2>

      {loading ? (
        <p>Loading student profile...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        student && (
          <div className="bg-white p-4 rounded shadow-md">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Course:</strong> {student.course}</p>

            {academicRecord ? (
              <div className="mt-4">
                <h3 className="text-xl font-semibold">Academic Records</h3>
                <p><strong>Last Updated:</strong> {new Date(academicRecord.lastUpdated).toLocaleDateString()}</p>

                {/* Display Grades */}
                <h4 className="text-lg font-semibold mt-2">Grades</h4>
                {academicRecord.grades.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {academicRecord.grades.map((grade, index) => (
                      <li key={index}>{grade.subject}: {grade.score}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No grades available.</p>
                )}

                {/* Display Achievements */}
                <h4 className="text-lg font-semibold mt-2">Achievements</h4>
                {academicRecord.achievements.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {academicRecord.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No achievements available.</p>
                )}

                {/* Display Transcripts */}
                <h4 className="text-lg font-semibold mt-2">Transcripts</h4>
                {academicRecord.transcripts.length > 0 ? (
                  <ul className="list-disc pl-4">
                    {academicRecord.transcripts.map((url, index) => (
                      <li key={index}>
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                          Transcript {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No transcripts available.</p>
                )}
              </div>
            ) : (
              <p>No academic records found.</p>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default StudentProfile;
