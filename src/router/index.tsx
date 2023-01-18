import {
  createBrowserRouter,
} from "react-router-dom";
import { AccountPage } from "../pages/account/Account";
import { AdminCourses } from "../pages/admin-virgo/pages/editCourses/AdminCourses";
import { ViewCourses } from "../pages/admin-virgo/pages/editCourses/ViewCourses";

import { HomePage } from "../pages/home/HomePage";
import { Main } from "../pages/main/main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage />,
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

export default router;