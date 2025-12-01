import { Button } from "@/components";
import { useTranslate } from "@/hooks/useTranslate";
import { PATHS } from "@/routes/paths";
import { ArrowLeft, FileQuestion, Home, Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-200 rounded-full blur-2xl opacity-50" />
            <div className="relative bg-gray-100 rounded-full p-6">
              <FileQuestion className="w-16 h-16 sm:w-20 sm:h-20 text-gray-600" />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <h1 className="text-8xl sm:text-9xl font-bold text-gray-900 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {t("error.404.title")}
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          {t("error.404.description")}
        </p>

        {/* Helpful Suggestions */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            {t("error.404.suggestions.title")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("error.404.suggestions.checkUrl")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("error.404.suggestions.useSearch")}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{t("error.404.suggestions.visitHome")}</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to={PATHS.HOME}>
            <Button variant="primary" size="lg" leftIcon={<Home className="w-5 h-5" />}>
              {t("error.404.actions.goHome")}
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<ArrowLeft className="w-5 h-5" />}
            onClick={() => window.history.back()}
          >
            {t("error.404.actions.goBack")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
