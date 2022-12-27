import {
  createBrowserRouter,
} from "react-router-dom";
import { AccountPage } from "../pages/account/Account";

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
      {
        path: "/account",
        element: <AccountPage />,
      },
    ],
  },
]);

export default router;