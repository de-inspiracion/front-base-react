import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  HashRouter,
  createHashRouter,
} from "react-router-dom";
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
import { Button, ConfigProvider, Empty, Result, theme } from "antd";
import AdminMain from "../pages/admin-virgo/pages/AdminMain";
import Landing from "../pages/landing/Landing";
import NoAccount from "../pages/NoAccount/NoAccount";
import DirectiveMain from "../pages/directive/pages/DirectiveMain";
import DashboardDirective from "../pages/directive/pages/DashboardDirective";
import services from "../services/http";
import { newDataUser } from "../store/user/userData";
import { useDispatch } from "react-redux";
import { Unauthorized } from "./unauthorized.component";
export default function RouterComponent() {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();

  if (isLoading) {
    return <div></div>;
  }
  if (error) {
    return <Unauthorized error={error} user={user}/>
  }
  const dispatch = useDispatch();
  const [profile, setProfile] = useState("");
  const getData = async () => {
    try {
      let res = await services.getUserInfo(String(user?.email));
      if(res.perfil == 'profesor'){
        const excloudedCourses = res.directive.excludeCourses
        res.inprogress = res.inprogress.filter((course:any) => !excloudedCourses.includes(course.course._id))
      }
      dispatch(
        newDataUser({
          id: res.id,
          name: res.nombre,
          email: res.email,
          directive: res.directive,
          profile: res.perfil,
          authenticated: isAuthenticated,
          age: res.age,
          inprogress: res.inprogress,
          finished: res.finished,
          scored: res.scored,
        })
      );
      setProfile(res.perfil);
    } catch (err) {
      // navigate("/accountnotfound");
    }
  };
  getData();
  const router = createHashRouter([
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
      path: "/directive",
      element: (
        <PrivateRoute isAuthenticated={isAuthenticated} component={<Main />} />
      ),
      children: [
        {
          path: "/directive",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<DirectiveMain />}
            />
          ),
        },
        {
          path: "/directive/courses",
          element: (
            <PrivateRoute
              isAuthenticated={isAuthenticated}
              component={<DashboardDirective />}
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
    //   path: "/director",
    //   element: <DirectiveMain/>,
    // },
    // {
    //   path: "/director/courses",
    //   element: <DashboardDirective/>,
    // },
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
          fontFamily: "'Open Sans', sans-serif",
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
