import React from "react";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl">Main Layout</h1>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; 2023 BoatBites Partners</p>
      </footer>
    </div>
  );
};

export default MainLayout;
