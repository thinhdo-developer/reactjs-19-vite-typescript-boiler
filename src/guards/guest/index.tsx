import { useCustomRouter } from "@hooks/useCustomRouter";
import useCustomSearchParams from "@hooks/useCustomSearchParams";
import { PATHS } from "@routes/paths";
import { useAppSelector } from "@store";
import { useEffect, useCallback } from "react";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useCustomRouter();

  const { searchParams } = useCustomSearchParams();

  const returnTo = searchParams.get("returnTo") || PATHS.HOME;

  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  const check = useCallback(() => {
    if (isAuthenticated) {
      router.replace(returnTo);
    }
  }, [isAuthenticated, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
