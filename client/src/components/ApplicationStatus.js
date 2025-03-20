import React, { useEffect, useState } from "react";

const ApplicationStatus = ({ studentId }) => {
  const [status, setStatus] = useState("Loading...");
  const [feedback, setFeedback] = useState(null);
  const [communicationMessage, setCommunicationMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        if (!studentId || studentId.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(studentId)) {
          throw new Error("Invalid student ID format.");
        }

        const response = await fetch(`/api/applications/student/${encodeURIComponent(studentId)}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          setStatus(data.applicationStatus || "Pending Review");
          setFeedback(data.feedback || "No feedback provided");
          setCommunicationMessage(data.communicationMessage || "No messages from the company");
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error("Error fetching application status:", err.message);
        setError(err.message || "Error fetching application status.");
      }
    };

    fetchStatus();
  }, [studentId]);

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      {error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <>
          <p className="text-lg font-semibold text-gray-800">
            <strong>Application Status:</strong> <span className="text-green-600">{status}</span>
          </p>

          <div className="mt-2">
            <h3 className="font-semibold text-gray-700">Company Feedback</h3>
            <p className="text-gray-600">{feedback}</p>
          </div>

          <div className="mt-2">
            <h3 className="font-semibold text-gray-700">Company Message</h3>
            <p className="text-gray-600">{communicationMessage}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationStatus;
