import { useCallback, useState } from "react";

/**
 * Custom hook for toggling boolean state
 * @param initialValue - Initial boolean value
 * @returns [value, toggle, setValue]
 */
export const useToggle = (
  initialValue: boolean = false
): [boolean, () => void, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  const setToggle = useCallback((val: boolean) => {
    setValue(val);
  }, []);

  return [value, toggle, setToggle];
};

export default useToggle;

