import React, { useState } from 'react';

const VideoInterview = ({ interviewId }) => {
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMeetingLink = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/interviews/${interviewId}/generate-link`);
      const data = await response.json();
      setMeetingLink(data.link);
    } catch (err) {
      console.error("Error generating meeting link:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Video Interview</h2>
      {meetingLink ? (
        <p>
          Meeting Link:{" "}
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">
            {meetingLink}
          </a>
        </p>
      ) : (
        <button onClick={generateMeetingLink} disabled={loading}>
          {loading ? "Generating..." : "Generate Meeting Link"}
        </button>
      )}
    </div>
  );
};

export default VideoInterview;
