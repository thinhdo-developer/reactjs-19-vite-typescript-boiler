import React from "react";

const ForbiddenPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="mt-4 text-xl text-gray-700">
          You do not have permission to access this page.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default ForbiddenPage;
