import LoadingSpinner from "@/components/loading-spinner";
import { useAppSelector } from "@/store";
import React from "react";

type GlobalLoadingProps = {
  text?: string;
  overlayClassName?: string;
};

const GlobalLoading: React.FC<GlobalLoadingProps> = ({
  text,
  overlayClassName = "",
}) => {
  const isLoading = useAppSelector((state) => state.app.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-[9999] ${overlayClassName}`}
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

export default GlobalLoading;

