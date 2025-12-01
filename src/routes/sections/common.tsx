import CompactLayout from "@layouts/compact";
import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";

// ----------------------------------------------------------------------

const Page403 = lazy(() => import("@pages/403"));
const Page404 = lazy(() => import("@pages/404"));
const Page500 = lazy(() => import("@pages/500"));

export const commonRoutes = [
  {
    element: (
      <CompactLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </CompactLayout>
    ),
    children: [
      { path: "500", element: <Page500 /> },
      { path: "403", element: <Page403 /> },
      { path: "404", element: <Page404 /> },
    ],
  },
];
