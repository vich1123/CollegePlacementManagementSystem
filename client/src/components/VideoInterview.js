import React, { useState } from 'react';

const VideoInterview = ({ interviewId }) => {
  const [meetingLink, setMeetingLink] = useState('');

  const generateMeetingLink = () => {
    fetch(`/api/interviews/${interviewId}/generate-link`)
      .then((res) => res.json())
      .then((data) => setMeetingLink(data.link))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Video Interview</h2>
      {meetingLink ? (
        <p>Meeting Link: <a href={meetingLink} target='_blank' rel='noopener noreferrer'>{meetingLink}</a></p>
      ) : (
        <button onClick={generateMeetingLink}>Generate Meeting Link</button>
      )}
    </div>
  );
};

export default VideoInterview;
