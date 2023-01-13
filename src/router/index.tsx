import {
  createBrowserRouter,
} from "react-router-dom";
import { AccountPage } from "../pages/account/Account";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import { HomePage } from "../pages/home/HomePage";
import { Main } from "../pages/main/main";
import { Login } from "../pages/login/Login"
import { useAuth0 } from '@auth0/auth0-react'
const router = createBrowserRouter([
  {
    path:'/',
    element:<PublicRoute isAuthenticated={false} component={<Login/>}/>
  },
  {
    path: "/home",
    element: <PrivateRoute isAuthenticated={false} component={<Main/>}/>,
    children: [
      {
        path: "/home",
        element: <PrivateRoute isAuthenticated={false} component={<HomePage/>}/>,
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
]);

export default router;