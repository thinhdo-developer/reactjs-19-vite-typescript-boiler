import { Navigate, useRoutes } from "react-router-dom";
import { authRoutes } from "./sections/auth";
import { mainRoutes } from "./sections/main";
import { commonRoutes } from "./sections/common";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // Main routes
    ...mainRoutes,

    // Common routes
    ...commonRoutes,

    // // Auth routes
    ...authRoutes,

    // No match 404
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
