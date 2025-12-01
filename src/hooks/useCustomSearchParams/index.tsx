import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const useCustomSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const customSearchParams = useMemo(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }, [searchParams]);

  const updateSearchParams = (newParams: Record<string, string>) => {
    const updatedParams = new URLSearchParams(searchParams);
    Object.keys(newParams).forEach((key) => {
      updatedParams.set(key, newParams[key]);
    });
    setSearchParams(updatedParams);
  };

  return { customSearchParams, updateSearchParams, searchParams };
};

export default useCustomSearchParams;
