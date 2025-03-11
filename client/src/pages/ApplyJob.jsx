import React, { useState } from 'react';
import axios from 'axios';

const ApplyJob = ({ jobId, studentId }) => {
  const [message, setMessage] = useState('');

  const handleApply = async () => {
    try {
      const response = await axios.post('/api/applications', { jobId, studentId });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error applying for job', error);
      setMessage('Error applying for job');
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <button onClick={handleApply}>Apply</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ApplyJob;
