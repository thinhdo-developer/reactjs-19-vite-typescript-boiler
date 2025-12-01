import useAuth from "@/hooks/useAuth";
import React from "react";

const Home: React.FC = () => {
  const { handleLogout } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to BoatBites Partners</h1>
      <p className="mt-4 text-lg text-gray-700">Your one-stop solution for all boating needs.</p>
      <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Get Started
      </button>
      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
