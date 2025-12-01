import { useToggle } from "@/hooks/useToggle";
import { useTranslate } from "@/hooks/useTranslate";
import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { Globe } from "lucide-react";
import React from "react";

export type LanguageSwitcherProps = {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  variant?: "default" | "minimal" | "icon-only";
  className?: string;
  "data-testid"?: string;
};

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "vn", name: "Tiếng Việt", flag: "🇻🇳" },
];

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  position = "top-right",
  variant = "default",
  className = "",
  "data-testid": dataTestId,
}) => {
  const { onChangeLang, i18n } = useTranslate();
  const [isLangMenuOpen, , setIsLangMenuOpen] = useToggle(false);

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    onChangeLang(langCode);
    setIsLangMenuOpen(false);
  };

  // Floating UI configuration
  const { refs, floatingStyles, context } = useFloating({
    open: isLangMenuOpen,
    onOpenChange: setIsLangMenuOpen,
    middleware: [
      offset(8), // 8px gap between button and dropdown
      flip({
        fallbackAxisSideDirection: "start",
      }),
      shift({
        padding: 8, // Prevent dropdown from touching viewport edges
      }),
    ],
    placement:
      position === "top-right" || position === "top-left"
        ? "bottom-start"
        : "top-start",
    whileElementsMounted: autoUpdate,
  });

  // Interactions
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const positionClasses = {
    "top-right": "top-4 right-4 sm:top-6 sm:right-6",
    "top-left": "top-4 left-4 sm:top-6 sm:left-6",
    "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
    "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
  };

  const buttonClasses = {
    default:
      "flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 text-sm font-medium text-gray-700",
    minimal:
      "flex items-center gap-2 px-2 py-1.5 bg-transparent border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 text-sm text-gray-600",
    "icon-only":
      "flex items-center justify-center w-9 h-9 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg shadow-sm hover:bg-white hover:shadow-md transition-all duration-200 text-gray-700",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} z-10 ${className}`}
      data-testid={dataTestId}
    >
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        className={buttonClasses[variant]}
        aria-label="Change language"
        aria-expanded={isLangMenuOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        {variant !== "icon-only" && (
          <>
            <span className="hidden sm:inline">{currentLanguage.flag}</span>
            {variant === "default" && (
              <span className="hidden md:inline">{currentLanguage.name}</span>
            )}
          </>
        )}
      </button>

      {isLangMenuOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                i18n.language === lang.code
                  ? "bg-primary/5 text-primary font-medium"
                  : "text-gray-700"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.name}</span>
              {i18n.language === lang.code && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
