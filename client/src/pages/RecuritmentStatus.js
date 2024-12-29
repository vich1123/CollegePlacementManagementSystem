import React, { useState, useEffect } from "react";

function RecruitmentStatus() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/recruitment-status");
        if (!response.ok) throw new Error("Failed to fetch data");
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Recruitment Status</h2>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
          </div>
        ))
      ) : (
        <p>No recruitment data available</p>
      )}
    </div>
  );
}

export default RecruitmentStatus;
