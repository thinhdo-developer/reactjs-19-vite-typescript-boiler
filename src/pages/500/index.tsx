import React from "react";

const InternalServerErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="text-2xl mt-4">Internal Server Error</p>
        <p className="mt-2 text-gray-600">
          Something went wrong on our end. Please try again later.
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
