// src/guards/AuthGuard.ts

import { useCustomRouter } from "@hooks/useCustomRouter";
import { PATHS } from "@routes/paths";
import { useAppSelector } from "@store";
import { FC, useCallback, useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.JSX.Element | React.JSX.Element[];
}

const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const router = useCustomRouter();

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!isAuthenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();
      router.replace(`${PATHS.AUTH.LOGIN}?${searchParams}`);
    } else {
      setChecked(true);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
