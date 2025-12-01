import { LoginResponse } from "@/services/auth/type";
import { useAppDispatch } from "@/store";
import { _logout, changeAuthenticatedStatus } from "@/store/slices/userSlice";
import storageHelpers from "@/utils/storage";
import { useCallback } from "react";

const useAuth = () => {
  const dispatch = useAppDispatch();

  const handleLoginSuccess = useCallback(
    (data: LoginResponse) => {
      storageHelpers.token.set(data.accessToken);
      dispatch(changeAuthenticatedStatus(true));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    storageHelpers.removeAll();
    dispatch(_logout());
  }, [dispatch]);

  return { handleLoginSuccess, handleLogout };
};

export default useAuth;
