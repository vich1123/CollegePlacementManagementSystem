import React, { useState, useEffect } from "react";
import { getStudents } from "../api/students";

const Students = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Students List</h2>
      <div className="bg-white shadow-md rounded p-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Course</th>
              <th className="p-2 border">Resume</th>
              <th className="p-2 border">Placement Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center">
                <td className="p-2 border">{student.name}</td>
                <td className="p-2 border">{student.email}</td>
                <td className="p-2 border">{student.course}</td>
                <td className="p-2 border">
                  <a href={student.resumeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Resume
                  </a>
                </td>
                <td className="p-2 border">{student.placementStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
