import React, { useState } from 'react';

const PlacementDrive = () => {
  const [company, setCompany] = useState('');
  const [date, setDate] = useState('');
  const [participants, setParticipants] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [drives, setDrives] = useState([]);

  const handleAddPlacementDrive = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!company || !date || participants <= 0) {
      setError('All fields are required, and participants must be greater than 0.');
      return;
    }

    try {
      const newDrive = { company, date, participants };
      const response = await fetch('http://localhost:5001/api/placements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDrive),
      });

      if (!response.ok) {
        throw new Error('Failed to add placement drive');
      }

      const data = await response.json();
      setMessage('Placement drive added successfully!');
      setDrives((prevDrives) => [...prevDrives, data]);
      setCompany('');
      setDate('');
      setParticipants(0);
    } catch (error) {
      console.error('Error adding placement drive:', error);
      setError('Failed to add placement drive.');
    }
  };

  return (
    <div className="placement-drive">
      <h2>Create Placement Drive</h2>
      <form onSubmit={handleAddPlacementDrive}>
        <input
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Participants"
          value={participants}
          onChange={(e) => setParticipants(Number(e.target.value))}
        />
        <button type="submit">Create Placement Drive</button>
      </form>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
    </div>
  );
};

export default PlacementDrive;
