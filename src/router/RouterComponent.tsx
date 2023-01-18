import React from 'react'
import {
    createBrowserRouter,
    RouterProvider
  } from "react-router-dom";
import { AccountPage } from "../pages/account/Account";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "../pages/home/HomePage";
import { Main } from "../pages/main/main";
import { Login } from "../pages/login/Login"
import { useAuth0 } from '@auth0/auth0-react'
import { AdminCourses } from "../pages/admin-virgo/pages/editCourses/AdminCourses";
import { ViewCourses } from "../pages/admin-virgo/pages/editCourses/ViewCourses";

export default function RouterComponent() {
    const { user, isAuthenticated, isLoading } = useAuth0()
    // console.log('EN ROUTER 2', isAuthenticated,user,isLoading)
    const router = createBrowserRouter([
        {
          path:'/',
          element:<PublicRoute isAuthenticated={isAuthenticated} component={<Login/>}/>
        },
        {
          path: "/home",
          element: <PrivateRoute isAuthenticated={isAuthenticated} component={<Main/>}/>,
          children: [
            {
              path: "/home",
              element: <PrivateRoute isAuthenticated={isAuthenticated} component={<HomePage/>}/>,
            },
            // {
            //   path: "/account",
            //   element: <AccountPage />,
            // },
          ],
          
        },
        {
          path: "/account",
          element: <AccountPage></AccountPage>,
        },
        {
          path: "/admin/course",
          element: <ViewCourses></ViewCourses>,
        },
        {
          path: "/admin/course/:idCourse",
          element: <AdminCourses></AdminCourses>,
        },
      ]);
    
  return (
    <RouterProvider router={router}/>
  )
}
