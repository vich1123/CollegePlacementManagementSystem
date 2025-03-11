import React, { useEffect, useState } from "react";
import { getCompanies } from "../services/api";
import "./CompanyList.css";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        if (industryFilter) queryParams.append("industry", industryFilter);
        if (locationFilter) queryParams.append("location", locationFilter);

        const data = await getCompanies(queryParams.toString());
        setCompanies(data.data || []);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [search, industryFilter, locationFilter]);

  return (
    <div className="list-container">
      <h2 className="list-title">Company List</h2>

      {/* Search and Filter Options */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by company name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Industry</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Filter by Location</option>
          <option value="New York">New York</option>
          <option value="San Francisco">San Francisco</option>
          <option value="Los Angeles">Los Angeles</option>
          <option value="Chicago">Chicago</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : companies.length === 0 ? (
        <p>No companies found.</p>
      ) : (
        <ul className="list-content">
          {companies.map((company) => (
            <li key={company._id} className="list-item">
              <strong>{company.name}</strong> - {company.industry}, {company.location}
              <p>Job Openings: {company.jobPostings.length > 0 ? company.jobPostings.join(", ") : "No jobs listed"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyList;
