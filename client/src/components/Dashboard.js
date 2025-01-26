import React from "react";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Placement Dashboard</h1>
        <div className="space-y-4">
          {/* Card 1 */}
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <h2 className="text-lg font-medium text-blue-800">Total Students</h2>
            <p className="text-xl font-bold text-blue-900">120</p>
          </div>

          {/* Card 2 */}
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <h2 className="text-lg font-medium text-green-800">Total Companies</h2>
            <p className="text-xl font-bold text-green-900">30</p>
          </div>

          {/* Card 3 */}
          <div className="p-4 bg-yellow-100 rounded-lg shadow">
            <h2 className="text-lg font-medium text-yellow-800">Applications</h2>
            <p className="text-xl font-bold text-yellow-900">250</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
