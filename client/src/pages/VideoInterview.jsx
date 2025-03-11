import React from 'react';
import VideoInterview from '../components/VideoInterview';

const VideoInterviewPage = () => {
  const interviewId = '67890'; 

  return (
    <div>
      <h1>Video Interview</h1>
      <VideoInterview interviewId={interviewId} />
    </div>
  );
};

export default VideoInterviewPage;
