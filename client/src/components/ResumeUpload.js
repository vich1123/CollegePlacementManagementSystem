import React, { useState } from "react";

const ResumeUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filePath, setFilePath] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setMessage("");
    setError("");

    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://localhost:5001/api/upload", { 
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload resume.");
      }

      const data = await response.json();
      if (data.success) {
        setFilePath(data.filePath);
        if (onUpload) onUpload(data.filePath);
        setMessage("Resume uploaded successfully!");
      } else {
        setError("Failed to upload resume.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setError("An error occurred while uploading.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full max-w-sm mx-auto">
      <input type="file" className="block w-full mb-2" onChange={handleFileChange} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpload}>
        Upload Resume
      </button>
      {message && <p className="mt-2 text-center text-green-500">{message}</p>}
      {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      {filePath && (
        <p className="mt-2 text-center text-blue-500">
          <a href={`http://localhost:5001${filePath}`} target="_blank" rel="noopener noreferrer">
            View Uploaded Resume
          </a>
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
