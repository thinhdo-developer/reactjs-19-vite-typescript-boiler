import { LanguageSwitcher } from "@/components";
import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 flex flex-col">
      <LanguageSwitcher position="top-right" />

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center shadow-lg">
                <img
                  src="/logo.png"
                  alt="TikTak Logo"
                  className="w-40 h-full object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-primary/80 to-primary" />

            <div className="relative pt-2">{children}</div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} TikTak. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AuthLayout;
