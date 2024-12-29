import React, { useState, useEffect } from "react";

function PlacementDrive() {
  const [drives, setDrives] = useState([]); // Initialize with an empty array
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/placements");
        const data = await response.json();
        console.log("API Response for Placement Drives:", data); // Debugging
        setDrives(Array.isArray(data) ? data : []); // Ensure drives is an array
      } catch (error) {
        console.error("Error fetching placement drives:", error);
        setDrives([]); // Handle failure case
      }
    };
    fetchDrives();
  }, []);

  const addPlacementDrive = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/placements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, date, participants }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("Placement drive added successfully!");
        setDrives((prevDrives) => [...prevDrives, data]);
        setCompany("");
        setDate("");
        setParticipants(0);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding placement drive:", error);
      setMessage("Failed to add placement drive");
    }
  };

  return (
    <div>
      <h2>Placement Drive Management</h2>
      <form onSubmit={addPlacementDrive}>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company Name"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
          placeholder="Number of Participants"
        />
        <button type="submit">Add Placement Drive</button>
      </form>
      {message && <p>{message}</p>}

      <h3>Existing Placement Drives</h3>
      {Array.isArray(drives) && drives.length > 0 ? (
        <ul>
          {drives.map((drive) => (
            <li key={drive._id}>
              {drive.company} - {new Date(drive.date).toLocaleDateString()} -{" "}
              {drive.participants} participants
            </li>
          ))}
        </ul>
      ) : (
        <p>No placement drives available</p>
      )}
    </div>
  );
}

export default PlacementDrive;
