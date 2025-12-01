import { useEffect, useRef, useState } from "react";

/**
 * Custom hook that throttles a value
 * @param value - The value to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled value
 */
export const useThrottle = <T>(value: T, limit: number = 500): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef<number>(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
};

export default useThrottle;

