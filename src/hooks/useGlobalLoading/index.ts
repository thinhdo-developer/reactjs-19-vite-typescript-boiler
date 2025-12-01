import { useCallback } from "react";
import { useAppDispatch } from "@/store";
import { updateLoading } from "@/store/slices/appSlice";

/**
 * Hook to manage global loading state
 * 
 * @example
 * ```tsx
 * const { showLoading, hideLoading, setLoading } = useGlobalLoading();
 * 
 * // Show loading
 * showLoading();
 * 
 * // Hide loading
 * hideLoading();
 * 
 * // Set loading state directly
 * setLoading(true);
 * ```
 */
export const useGlobalLoading = () => {
  const dispatch = useAppDispatch();

  const showLoading = useCallback(() => {
    dispatch(updateLoading(true));
  }, [dispatch]);

  const hideLoading = useCallback(() => {
    dispatch(updateLoading(false));
  }, [dispatch]);

  const setLoading = useCallback(
    (isLoading: boolean) => {
      dispatch(updateLoading(isLoading));
    },
    [dispatch]
  );

  return {
    showLoading,
    hideLoading,
    setLoading,
  };
};

export default useGlobalLoading;

