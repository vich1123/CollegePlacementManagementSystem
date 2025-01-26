import React, { useState, useEffect } from "react";
import { fetchCompanies } from "../services/api";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await fetchCompanies();
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    loadCompanies();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-lg font-bold mb-4">Company List</h2>
      <ul className="list-disc pl-6">
        {companies.map((company) => (
          <li key={company.id}>{company.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CompanyList;
