import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies, getCompanyApplications, reviewApplication } from "../services/api";

function CompanyDashboard() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewData, setReviewData] = useState({});
  const navigate = useNavigate();

  // Fetch all companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await getCompanies();
        console.log("Companies API Response:", response);

        if (response.success && response.data?.length > 0) {
          setCompanies(response.data);
        } else {
          setError("No companies found.");
        }
      } catch (err) {
        console.error("Error loading companies:", err);
        setError("Error loading companies.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch applications for a selected company
  const fetchApplications = async (companyId) => {
    try {
      const response = await getCompanyApplications(companyId);
      if (response.success && response.data) {
        setApplications(response.data);
        setSelectedCompany(companyId);
      } else {
        setError("No applications found for this company.");
        setApplications([]); // Prevent undefined state errors
      }
    } catch (err) {
      console.error("Error loading applications:", err);
      setError("Error loading applications.");
    }
  };

  // Handle application review & update
  const handleReviewChange = (applicationId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [applicationId]: { ...prev[applicationId], [field]: value },
    }));
  };

  const submitReview = async (applicationId) => {
    try {
      const { status, feedback, communicationMessage } = reviewData[applicationId] || {};
      if (!status) {
        alert("Please select a status before submitting.");
        return;
      }

      const response = await reviewApplication(applicationId, {
        status,
        feedback,
        communicationMessage,
      });

      if (response.success) {
        alert("Application reviewed successfully!");
        fetchApplications(selectedCompany); // Refresh the application list
      } else {
        alert("Error reviewing application.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      alert("Error submitting review.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Company Dashboard</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={() => navigate("/add-company")}
          >
            + Add Company
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Loading companies...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && companies.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold">Select a Company to View Applications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {companies.map((company) => (
                <div
                  key={company._id}
                  className="bg-white p-4 rounded shadow-md border cursor-pointer hover:bg-gray-100"
                  onClick={() => fetchApplications(company._id)}
                >
                  <h3 className="font-semibold text-lg">{company.name || "No Name Provided"}</h3>
                  <p className="text-sm text-gray-600">
                    {company.description ? company.description : "No description available."}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> {company.contactEmail ? company.contactEmail : "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Review Section */}
        {selectedCompany && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Applications for {companies.find(c => c._id === selectedCompany)?.name}</h3>

            {applications.length === 0 ? (
              <p className="text-center text-gray-600">No applications found for this company.</p>
            ) : (
              <div className="mt-4">
                {applications.map((app) => (
                  <div key={app._id} className="bg-white p-4 rounded shadow-md border mb-4">
                    <h4 className="text-lg font-semibold">{app.studentId?.name || "Unknown Student"}</h4>
                    <p className="text-sm text-gray-600"><strong>Email:</strong> {app.studentId?.email || "Unknown Email"}</p>
                    <p className="text-sm text-gray-600"><strong>Job Title:</strong> {app.jobTitle || "N/A"}</p>
                    <p className="text-sm text-gray-500"><strong>Application Status:</strong> {app.status || "N/A"}</p>

                    <button
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={() => submitReview(app._id)}
                    >
                      Submit Review
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDashboard;
