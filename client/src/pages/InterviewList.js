import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InterviewList = ({ studentId }) => {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const response = await axios.get(`/api/interviews/student/${studentId}`);
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews', error);
      }
    };
    fetchInterviews();
  }, [studentId]);

  return (
    <div>
      <h2>My Interviews</h2>
      <ul>
        {interviews.map((interview) => (
          <li key={interview._id}>{interview.date} at {interview.time} - {interview.status}</li>
        ))}
      </ul>
    </div>
  );
};

export default InterviewList;
