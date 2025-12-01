import Button from "@/components/button";
import { Inbox } from "lucide-react";
import React from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No data found",
  description = "There's nothing to display here yet.",
  icon,
  action,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      {icon || <Inbox className="w-16 h-16 text-gray-400 mb-4" />}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-6 max-w-sm">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;

