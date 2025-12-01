/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircleX } from "lucide-react";
import {
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  isLoading?: boolean;
  size?: ModalSize;
  className?: string;
  contentClassName?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      children,
      footer,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscape = true,
      isLoading = false,
      size = "md",
      className = "",
      contentClassName = "",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      "aria-describedby": ariaDescribedBy,
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const modalId = useId();
    // Size variants
    const sizeClasses: Record<ModalSize, string> = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      fullscreen: "max-w-full max-h-full m-4",
    };

    // Handle overlay click
    const handleOverlayClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (
          closeOnOverlayClick &&
          !isLoading &&
          e.target === overlayRef.current
        ) {
          onClose();
        }
      },
      [closeOnOverlayClick, isLoading, onClose]
    );

    // Prevent modal content click from closing
    const handleModalClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      },
      []
    );

    // Handle escape key
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape" && !isLoading) {
          onClose();
        }
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, closeOnEscape, isLoading, onClose]);

    // Handle body scroll lock
    useEffect(() => {
      if (isOpen) {
        previousActiveElement.current = document.activeElement as HTMLElement;
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        // Restore focus to previous element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }
      return () => {
        document.body.style.overflow = "";
      };
    }, [isOpen]);

    // Focus trap - focus first focusable element when modal opens
    useEffect(() => {
      if (!isOpen || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      // Focus first element
      if (firstElement) {
        firstElement.focus();
      }

      // Handle tab key for focus trap
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      };

      modalRef.current.addEventListener("keydown", handleTab);
      return () => {
        modalRef.current?.removeEventListener("keydown", handleTab);
      };
    }, [isOpen]);

    const titleId = title ? `${modalId}-title` : undefined;

    if (!isOpen) return null;

    const modalContent = (
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity duration-200"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || titleId}
        aria-describedby={ariaDescribedBy}
      >
        <div
          ref={modalRef}
          className={`
            bg-white rounded-lg shadow-xl relative flex flex-col
            w-full ${sizeClasses[size]}
            max-h-[90vh] transform transition-all duration-200
            ${className}
          `}
          onClick={handleModalClick}
          role="document"
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between px-4 md:px-6 pt-6 pb-4 border-b border-gray-200">
              {title && (
                <h2
                  id={titleId}
                  className="text-xl font-semibold text-gray-900 flex-1"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className={`
                    ml-4 p-1 rounded-md
                    text-gray-400 hover:text-gray-600 hover:bg-gray-100
                    focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                    transition-colors duration-150
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                  disabled={isLoading}
                  aria-label="Close modal"
                  type="button"
                >
                  <CircleX className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          {/* Content */}
          <div
            className={`
              flex-1 overflow-y-auto px-4 md:px-6 py-4
              ${!title && !showCloseButton ? "pt-6" : ""}
              ${!footer ? "pb-6" : ""}
              ${contentClassName}
            `}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
              {footer}
            </div>
          )}

          {/* Loading overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </div>
    );

    // Render to portal (body) to avoid z-index issues
    return createPortal(modalContent, document.body);
  }
);

Modal.displayName = "Modal";

export default Modal;
