import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../services/api";
import { getAcademicRecordByStudent, updateAcademicRecord } from "../services/academicRecords";

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [academicRecord, setAcademicRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAchievement, setNewAchievement] = useState("");
  const [newGrade, setNewGrade] = useState({ subject: "", score: "" });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentData = await getStudentById(studentId);
        setStudent(studentData.data);

        // Fetch academic records
        const academicData = await getAcademicRecordByStudent(studentId);
        setAcademicRecord(academicData);
      } catch (error) {
        console.error("Error fetching student profile", error);
        setError("Failed to fetch student details.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [studentId]);

  const handleAddAchievement = async () => {
    if (!newAchievement) return;
    try {
      const updatedRecord = await updateAcademicRecord(studentId, {
        achievements: [...academicRecord.achievements, newAchievement],
      });
      setAcademicRecord(updatedRecord);
      setNewAchievement("");
    } catch (error) {
      console.error("Error adding achievement", error);
    }
  };

  const handleAddGrade = async () => {
    if (!newGrade.subject || !newGrade.score) return;
    try {
      const updatedRecord = await updateAcademicRecord(studentId, {
        grades: [...academicRecord.grades, newGrade],
      });
      setAcademicRecord(updatedRecord);
      setNewGrade({ subject: "", score: "" });
    } catch (error) {
      console.error("Error adding grade", error);
    }
  };

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

                {/* Add Grade Input */}
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={newGrade.subject}
                    onChange={(e) => setNewGrade({ ...newGrade, subject: e.target.value })}
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Score"
                    value={newGrade.score}
                    onChange={(e) => setNewGrade({ ...newGrade, score: e.target.value })}
                    className="border p-2 rounded ml-2"
                  />
                  <button onClick={handleAddGrade} className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Add Grade
                  </button>
                </div>

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

                {/* Add Achievement Input */}
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="New Achievement"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="border p-2 rounded"
                  />
                  <button onClick={handleAddAchievement} className="ml-2 bg-green-600 text-white px-4 py-2 rounded">
                    Add Achievement
                  </button>
                </div>
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
