import GuestGuard from "@guards/guest";
import AuthLayout from "@layouts/auth";
import { lazy } from "react";

const PageLogin = lazy(() => import("@pages/auth/login"));
const PageRegister = lazy(() => import("@/pages/auth/register"));

export const authRoutes = [
  {
    path: "auth",
    children: [
      {
        path: "login",
        element: (
          <GuestGuard>
            <AuthLayout>
              <PageLogin />
            </AuthLayout>
          </GuestGuard>
        ),
      },
      {
        path: "register",
        element: (
          <GuestGuard>
            <AuthLayout>
              <PageRegister />
            </AuthLayout>
          </GuestGuard>
        ),
      },
    ],
  },
];
