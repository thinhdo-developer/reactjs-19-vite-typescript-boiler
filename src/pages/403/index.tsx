import { Button } from "@/components";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import { ArrowLeft, Home, ShieldAlert } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const ForbiddenPage: React.FC = () => {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50 animate-pulse" />
            <div className="relative bg-red-50 rounded-full p-6">
              <ShieldAlert className="w-16 h-16 sm:w-20 sm:h-20 text-red-600" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
          403
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("error.403.title")}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t("error.403.description")}
        </p>

        {/* Helpful Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
          <p className="text-sm text-blue-800">
            {t("error.403.tip")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to={PATHS.HOME}>
            <Button variant="primary" size="lg" leftIcon={<Home className="w-5 h-5" />}>
              {t("error.403.actions.goHome")}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            {t("error.403.actions.goBack")}
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500">
          <p>{t("error.403.help.text")}</p>
          <Link
            to={PATHS.AUTH.LOGIN}
            className="text-primary hover:text-primary/80 font-medium mt-2 inline-block"
          >
            {t("error.403.help.loginLink")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenPage;
