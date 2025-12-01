import { Navigate, useRoutes } from "react-router-dom";
import { PATHS } from "./paths";
import { authRoutes } from "./sections/auth";
import { commonRoutes } from "./sections/common";
import { mainRoutes } from "./sections/main";

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
    { path: "*", element: <Navigate to={PATHS.PUBLIC.NOT_FOUND} replace /> },
  ]);
}
