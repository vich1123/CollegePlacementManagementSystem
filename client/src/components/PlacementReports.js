import React, { useEffect, useState } from 'react';

const PlacementReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => setReports(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Placement Reports</h2>
      <ul>
        {reports.map((report) => (
          <li key={report._id}>{report.title} - {report.studentsPlaced} placed</li>
        ))}
      </ul>
    </div>
  );
};

export default PlacementReports;
