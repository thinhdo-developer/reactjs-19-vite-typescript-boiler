import AuthGuard from "@guards/auth";
import MainLayout from "@layouts/main";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

const PageHome = lazy(() => import("@pages/home"));

export const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </MainLayout>
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <PageHome />,
      },
    ],
  },
];
