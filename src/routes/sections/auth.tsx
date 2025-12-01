import GuestGuard from "@guards/guest";
import AuthLayout from "@layouts/auth";
import { lazy } from "react";

const PageLogin = lazy(() => import("@pages/auth/login"));
const PageRegister = lazy(() => import("@/pages/auth/register"));
const PageForgotPassword = lazy(() => import("@pages/auth/forgot-password"));
const PageVerifyOtp = lazy(() => import("@pages/auth/verify-otp"));
const PageResetPassword = lazy(() => import("@pages/auth/reset-password"));

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
      {
        path: "forgot-password",
        element: (
          <GuestGuard>
            <AuthLayout>
              <PageForgotPassword />
            </AuthLayout>
          </GuestGuard>
        ),
      },
      {
        path: "verify-otp",
        element: (
          <GuestGuard>
            <AuthLayout>
              <PageVerifyOtp />
            </AuthLayout>
          </GuestGuard>
        ),
      },
      {
        path: "reset-password",
        element: (
          <GuestGuard>
            <AuthLayout>
              <PageResetPassword />
            </AuthLayout>
          </GuestGuard>
        ),
      },
    ],
  },
];
