import React from 'react';

function CompanyList() {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Listings</h3>
      <ul className="space-y-2">
        {/* Replace this with dynamic data */}
        <li className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300">
          Example Company - Job Roles: Developer, Tester
        </li>
        <li className="bg-white px-4 py-2 rounded-md shadow-sm border border-gray-300">
          Another Company - Job Roles: Designer, Manager
        </li>
      </ul>
    </div>
  );
}

export default CompanyList;
 