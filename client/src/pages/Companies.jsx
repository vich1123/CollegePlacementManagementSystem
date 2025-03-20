import React, { useState, useEffect } from "react";
import { getCompanies, applyForJob } from "../services/companies";

const Companies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await getCompanies();
      setCompanies(data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleApply = async (companyId, jobTitle) => {
    try {
      await applyForJob(companyId, jobTitle);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error applying for job:", error);
      alert("Error applying for job.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Companies & Job Openings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company._id} className="bg-white shadow-md rounded p-4">
            <h3 className="text-xl font-semibold">{company.name}</h3>
            <p className="text-gray-600">Location: {company.location}</p>
            <p className="text-gray-600">Industry: {company.industry}</p>
            <h4 className="mt-2 font-semibold">Job Openings:</h4>
            {company.jobPostings.length > 0 ? (
              <ul>
                {company.jobPostings.map((job, index) => (
                  <li key={index}>
                    {job}
                    <button
                      onClick={() => handleApply(company._id, job)}
                      className="ml-2 bg-blue-500 text-white px-4 py-1 rounded"
                    >
                      Apply Now
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No jobs available.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
