import { useCallback, useState } from "react";

/**
 * Custom hook for copying text to clipboard
 * @returns [copied, copy, error]
 */
export const useCopyToClipboard = (): [
  boolean,
  (text: string) => Promise<void>,
  Error | null
] => {
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(async (text: string) => {
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard API not available");
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(null);

      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to copy"));
      setCopied(false);
    }
  }, []);

  return [copied, copy, error];
};

export default useCopyToClipboard;

