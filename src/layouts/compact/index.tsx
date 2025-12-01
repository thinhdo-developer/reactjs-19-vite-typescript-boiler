// src/components/CompactLayout.tsx

import React, { FC } from "react";

interface CompactLayoutProps {
  children: React.ReactNode;
}

const CompactLayout: FC<CompactLayoutProps> = ({ children }) => {
  return <div className="p-4 space-y-2 bg-gray-100 rounded-lg shadow-md">{children}</div>;
};

export default CompactLayout;
