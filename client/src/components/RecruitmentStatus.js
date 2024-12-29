import React, { useEffect, useState } from "react";
import { fetchRecruitmentStatus } from "../services/api";

function RecruitmentStatus() {
  const [statusList, setStatusList] = useState([]);

  useEffect(() => {
    const getStatusList = async () => {
      try {
        const response = await fetchRecruitmentStatus();
        setStatusList(response.data);
      } catch (error) {
        console.error("Error fetching recruitment status:", error);
      }
    };
    getStatusList();
  }, []);

  return (
    <div>
      <h2>Recruitment Status</h2>
      <ul>
        {statusList.map((status) => (
          <li key={status._id}>
            <p><strong>Student:</strong> {status.studentName}</p>
            <p><strong>Company:</strong> {status.companyName}</p>
            <p><strong>Status:</strong> {status.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecruitmentStatus;
