import React, { useEffect, useState } from "react";
import { fetchRecruitmentStatus } from "../api/recruitmentStatus";

const RecruitmentStatus = () => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const data = await fetchRecruitmentStatus();
        setStatus(data);
      } catch (err) {
        setError("Failed to fetch recruitment status.");
      }
    };

    getStatus();
  }, []);

  return (
    <div>
      <h2>Recruitment Status</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {status ? (
        <div>
          <p>Students Placed: {status.studentsPlaced}</p>
          <p>Offers Made: {status.offersMade}</p>
          <p>Companies Participated: {status.companiesParticipated}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RecruitmentStatus;
