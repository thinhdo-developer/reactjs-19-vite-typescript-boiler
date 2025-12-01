import { Button } from "@/components";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const InternalServerErrorPage: React.FC = () => {
  const { t } = useTranslate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-100 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-orange-50 rounded-full p-6">
              <AlertTriangle className="w-16 h-16 sm:w-20 sm:h-20 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
          500
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("error.500.title")}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t("error.500.description")}
        </p>

        {/* Helpful Information */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-orange-800">
            {t("error.500.info")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            leftIcon={<RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />}
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            {t("error.500.actions.refresh")}
          </Button>
          <Link to={PATHS.HOME}>
            <Button variant="outline" size="lg" leftIcon={<Home className="w-5 h-5" />}>
              {t("error.500.actions.goHome")}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            {t("error.500.actions.goBack")}
          </Button>
        </div>

        {/* Support Information */}
        <div className="mt-12 text-sm text-gray-500">
          <p>{t("error.500.support.text")}</p>
          <p className="mt-2">
            {t("error.500.support.contact")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InternalServerErrorPage;
