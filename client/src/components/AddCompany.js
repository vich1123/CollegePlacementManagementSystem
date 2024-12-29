import React, { useState } from 'react';
import { addCompany } from '../services/api';

function AddCompany() {
  const [company, setCompany] = useState({ name: '', jobPostings: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCompany({ ...company, jobPostings: company.jobPostings.split(',') });
      setMessage('Company added successfully!');
      setCompany({ name: '', jobPostings: '' });
    } catch (error) {
      setMessage('Failed to add company. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Add Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Company Name</label>
          <input
            id="name"
            name="name"
            value={company.name}
            onChange={handleChange}
            placeholder="Enter company name"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="jobPostings">Job Postings</label>
          <input
            id="jobPostings"
            name="jobPostings"
            value={company.jobPostings}
            onChange={handleChange}
            placeholder="Job Postings (comma-separated)"
            className="input-field"
          />
        </div>
        <button type="submit" className="button">Add Company</button>
      </form>
      {message && <p className={`feedback-message ${message.includes('Failed') ? 'text-red-500' : 'text-green-500'} text-center`}>{message}</p>}
    </div>
  );
}

export default AddCompany;
