import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Placement Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-blue-800">Total Students</h2>
            <p className="text-2xl font-bold text-blue-900">120</p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-green-800">Total Companies</h2>
            <p className="text-2xl font-bold text-green-900">30</p>
          </div>

          {/* Card 3 */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-yellow-800">Applications</h2>
            <p className="text-2xl font-bold text-yellow-900">250</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
