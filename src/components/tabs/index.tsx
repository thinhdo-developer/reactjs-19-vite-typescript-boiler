import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

export type TabVariant = "underline" | "pills" | "enclosed";

export interface Tab {
  label: string;
  content: ReactNode;
  key: string | number;
  icon?: ReactNode;
  disabled?: boolean;
  badge?: string | number;
  "aria-label"?: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey?: string | number; // Controlled mode
  initialActiveKey?: string | number; // Uncontrolled mode
  onTabChange?: (key: string | number) => void;
  variant?: TabVariant;
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  activeTabClassName?: string;
  contentClassName?: string;
  rightContent?: ReactNode;
  lazy?: boolean; // Lazy load tab content
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      activeKey: controlledActiveKey,
      initialActiveKey,
      onTabChange,
      variant = "underline",
      className = "",
      tabListClassName = "",
      tabClassName = "",
      activeTabClassName = "",
      contentClassName = "",
      rightContent,
      lazy = false,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
    },
    ref
  ) => {
    const isControlled = controlledActiveKey !== undefined;
    const [internalActiveKey, setInternalActiveKey] = useState(
      initialActiveKey ?? tabs.find((tab) => !tab.disabled)?.key ?? tabs[0].key
    );
    const activeKey = isControlled ? controlledActiveKey : internalActiveKey;
    const tabRefs = useRef<Map<string | number, HTMLButtonElement>>(new Map());
    const generatedId = useId();
    const tabsId = `tabs-${generatedId}`;

    const handleTabChange = useCallback(
      (key: string | number) => {
        const tab = tabs.find((t) => t.key === key);
        if (tab?.disabled) return;

        if (!isControlled) {
          setInternalActiveKey(key);
        }
        onTabChange?.(key);
      },
      [isControlled, onTabChange, tabs]
    );

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, currentKey: string | number) => {
        const enabledTabs = tabs.filter((tab) => !tab.disabled);
        const currentIndex = enabledTabs.findIndex(
          (tab) => tab.key === currentKey
        );

        let newIndex = currentIndex;

        switch (e.key) {
          case "ArrowLeft":
            e.preventDefault();
            newIndex =
              currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
            break;
          case "ArrowRight":
            e.preventDefault();
            newIndex =
              currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
            break;
          case "Home":
            e.preventDefault();
            newIndex = 0;
            break;
          case "End":
            e.preventDefault();
            newIndex = enabledTabs.length - 1;
            break;
          default:
            return;
        }

        const newTab = enabledTabs[newIndex];
        if (newTab) {
          handleTabChange(newTab.key);
          tabRefs.current.get(newTab.key)?.focus();
        }
      },
      [tabs, handleTabChange]
    );

    // Update active key when controlled prop changes
    useEffect(() => {
      if (isControlled && controlledActiveKey !== undefined) {
        const tab = tabs.find((t) => t.key === controlledActiveKey);
        if (tab && !tab.disabled) {
          // Controlled mode - don't update internal state
        }
      }
    }, [isControlled, controlledActiveKey, tabs]);

    // Variant styles
    const getVariantStyles = (isActive: boolean, disabled?: boolean) => {
      const baseStyles =
        "relative px-4 py-3 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-t-lg";

      if (disabled) {
        return `${baseStyles} opacity-50 cursor-not-allowed text-gray-400`;
      }

      switch (variant) {
        case "underline":
          return `${baseStyles} ${
            isActive
              ? "border-b-2 border-primary text-primary font-semibold"
              : "text-gray-600 hover:text-primary border-b-2 border-transparent"
          }`;
        case "pills":
          return `${baseStyles} rounded-lg ${
            isActive
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`;
        case "enclosed":
          return `${baseStyles} border ${
            isActive
              ? "bg-white border-primary text-primary border-b-transparent rounded-b-none"
              : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
          }`;
        default:
          return baseStyles;
      }
    };

    const activeTab = tabs.find((tab) => tab.key === activeKey);

    return (
      <div ref={ref} className={`w-full ${className}`} role="tablist">
        <div
          className={`flex items-center justify-between ${tabListClassName}`}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
        >
          <div
            className={`flex ${
              variant === "enclosed" ? "gap-0" : "gap-1"
            } border-b ${
              variant === "enclosed" ? "border-gray-300" : "border-gray-200"
            } ${variant === "pills" ? "gap-2 border-0" : ""}`}
          >
            {tabs.map((tab) => {
              const isActive = activeKey === tab.key;
              const tabId = `${tabsId}-tab-${tab.key}`;
              const panelId = `${tabsId}-panel-${tab.key}`;

              return (
                <button
                  key={tab.key}
                  ref={(el) => {
                    if (el) {
                      tabRefs.current.set(tab.key, el);
                    } else {
                      tabRefs.current.delete(tab.key);
                    }
                  }}
                  id={tabId}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  aria-disabled={tab.disabled}
                  aria-label={tab["aria-label"] || tab.label}
                  tabIndex={isActive ? 0 : -1}
                  disabled={tab.disabled}
                  onClick={() => handleTabChange(tab.key)}
                  onKeyDown={(e) => handleKeyDown(e, tab.key)}
                  className={`${getVariantStyles(isActive, tab.disabled)} ${
                    activeTabClassName && isActive ? activeTabClassName : ""
                  } ${tabClassName}`}
                >
                  <span className="flex items-center gap-2">
                    {tab.icon && (
                      <span className={isActive ? "text-primary" : ""}>
                        {tab.icon}
                      </span>
                    )}
                    {tab.label}
                    {tab.badge !== undefined && (
                      <span
                        className={`ml-1 px-2 py-0.5 text-xs rounded-full ${
                          isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {tab.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          {rightContent && (
            <div className="ml-4 flex items-center">{rightContent}</div>
          )}
        </div>

        {/* Tab Panels */}
        <div
          className={`mt-4 ${contentClassName}`}
          role="tabpanel"
          id={`${tabsId}-panel-${activeKey}`}
          aria-labelledby={`${tabsId}-tab-${activeKey}`}
        >
          {lazy ? (
            // Lazy load - only render active tab
            <div key={activeKey} className="animate-in fade-in duration-200">
              {activeTab?.content}
            </div>
          ) : (
            // Eager load - render all, hide inactive
            tabs.map((tab) => (
              <div
                key={tab.key}
                className={tab.key === activeKey ? "block" : "hidden"}
                role="tabpanel"
                id={`${tabsId}-panel-${tab.key}`}
                aria-labelledby={`${tabsId}-tab-${tab.key}`}
              >
                {tab.content}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

export default Tabs;
