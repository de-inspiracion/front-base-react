import React, { useEffect } from "react";
import { RouterProvider, createHashRouter } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "../pages/home/HomePage";
import { Main } from "../pages/main/main";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminCourses } from "../pages/admin-virgo/pages/editCourses/AdminCourses";
import { ViewCourses } from "../pages/admin-virgo/pages/editCourses/ViewCourses";
import MiProgreso from "../pages/mi-progreso/MiProgreso";
import RutasDeAprendizaje from "../pages/rutas-aprendizaje/RutasDeAprendizaje";
import { ConfigProvider, theme } from "antd";
import AdminMain from "../pages/admin-virgo/pages/AdminMain";
import Landing from "../pages/landing/Landing";
import NoAccount from "../pages/NoAccount/NoAccount";
import DirectiveMain from "../pages/directive/pages/DirectiveMain";
import DashboardDirective from "../pages/directive/pages/DashboardDirective";
import { Unauthorized } from "./unauthorized.component";
import ViewStatistics from "../pages/directive/pages/ViewStatistics";
export default function RouterComponent() {
  const { isLoading, isAuthenticated, error, user } = useAuth0();
  const [userRole, setUserRole] = React.useState<string>("virgo");

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <Unauthorized error={error} user={user} />;
  }
  console.log("roleUser", userRole);
  const router = createHashRouter([
    {
      path: "/",
      element: (
        <PublicRoute
          isAuthenticated={isAuthenticated}
          component={<Landing />}
          setUserRole={setUserRole}
        />
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          component={<Main />}
          role="profesor"
          userRole={userRole}
        />
      ),
      children: [
        {
          path: "/home",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<HomePage />}
              role="profesor"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/home/rutas-de-aprendizaje",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<RutasDeAprendizaje />}
              role="profesor"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/home/mi-progreso",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<MiProgreso />}
              role="profesor"
              userRole={userRole}
            />
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          component={<Main />}
          role="virgo"
          userRole={userRole}
        />
      ),
      children: [
        {
          path: "/admin",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<AdminMain />}
              role="virgo"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/admin/course",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<ViewCourses />}
              role="virgo"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/admin/course/:idCourse",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<AdminCourses />}
              role="virgo"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/admin/statistics",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<ViewStatistics />}
              role="virgo"
              userRole={userRole}
            />
          ),
        },
      ],
    },
    {
      path: "/directive",
      element: (
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          role="directiva"
          component={<Main />}
          userRole={userRole}
        />
      ),
      children: [
        {
          path: "/directive",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<DirectiveMain />}
              role="directiva"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/directive/courses",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<DashboardDirective />}
              role="directiva"
              userRole={userRole}
            />
          ),
        },
        {
          path: "/directive/statistics",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<ViewStatistics />}
              role="directiva"
              userRole={userRole}
            />
          ),
        },
      ],
    },
    {
      path: "/sostenedor",
      element: (
        <PrivateRoute
          isAuthenticated={isAuthenticated}
          role="sostenedor"
          component={<Main />}
          userRole={userRole}
        />
      ),
      children: [
        {
          path: "/sostenedor/statistics",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<ViewStatistics />}
              role="sostenedor"
              userRole={userRole}
            />
          ),
        },
      ],
    },
    {
      path: "/accountnotfound",
      element: <NoAccount />,
    },
  ]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ffd45a",
          fontFamily: "'Open Sans', sans-serif",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
