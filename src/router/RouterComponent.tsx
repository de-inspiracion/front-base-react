import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AccountPage } from "../pages/account/Account";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "../pages/home/HomePage";
import { Main } from "../pages/main/main";
import { Login } from "../pages/login/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { AdminCourses } from "../pages/admin-virgo/pages/editCourses/AdminCourses";
import { ViewCourses } from "../pages/admin-virgo/pages/editCourses/ViewCourses";
import MiProgreso from "../pages/mi-progreso/MiProgreso";
import RutasDeAprendizaje from "../pages/rutas-aprendizaje/RutasDeAprendizaje";
import { ConfigProvider, theme } from "antd";
import AdminMain from "../pages/admin-virgo/pages/AdminMain";
import Landing from "../pages/landing/Landing";
import NoAccount from "../pages/NoAccount/NoAccount";

export default function RouterComponent() {
  const { user, isAuthenticated, logout } = useAuth0();
  // console.log('EN ROUTER 2', isAuthenticated,user,isLoading)
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PublicRoute
          isAuthenticated={isAuthenticated}
          redirectTo="/home"
          component={<Landing />}
        />
      ),
    },
    {
      path: "/home",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} component={<Main />} />
      ),
      children: [
        {
          path: "/home",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<HomePage />}
            />
          ),
        },
        {
          path: "/home/rutas-de-aprendizaje",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<RutasDeAprendizaje />}
            />
          ),
        },
        {
          path: "/home/mi-progreso",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<MiProgreso />}
            />
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} component={<Main />} />
      ),
      children: [
        {
          path: "/admin",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<AdminMain />}
            />
          ),
        },
        {
          path: "/admin/course",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<ViewCourses />}
            />
          ),
        },
        {
          path: "/admin/course/:idCourse",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<AdminCourses />}
            />
          ),
        },
      ],
    },
    {
      path: "/accountnotfound",
      element: <NoAccount />,
    },

    // {
    //   path: "/account",
    //   element: <AccountPage></AccountPage>,
    // },
    // {
    //   path: "/admin",
    //   element: <AdminMain />,
    // },
    // {
    //   path: "/admin/course",
    //   element: <ViewCourses></ViewCourses>,
    // },
    // {
    //   path: "/admin/course/:idCourse",
    //   element: <AdminCourses></AdminCourses>,
    // },
  ]);

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#ffd45a",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
