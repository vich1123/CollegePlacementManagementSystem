import React, { useState, useEffect } from "react";
import { getCompanies } from "../api/companies";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Companies & Job Openings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <p className="text-gray-600">Jobs: {company.jobPostings.join(", ")}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
