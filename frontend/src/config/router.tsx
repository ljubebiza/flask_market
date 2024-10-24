import {
  ActionFunctionArgs,
  createBrowserRouter,
  json,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "../componets/layout/RootLayout";
import Login from "../componets/login/Login";
import ProtectedRoute from "../componets/protectedRoute/ProtectedRoute";
import ErrorBoundary from "../componets/views/ErrorBoudary";
import Home from "../pages/Home";
import MarketOverview, {
  loader as productsLoader,
} from "../pages/marketOverview/MarketOverview";
import RegisterPage from "../pages/registrPage/RegisterPage";
import { autenticateUser } from "../api/authenticateUser";
import { logoutUser } from "../api/logoutUser";
import { itemActions } from "../api/itemActions";
import { useStore } from "../store/store";
import { registerUser } from "../api/registerUser";

const RouterWrapper = () => {
  const dispatch = useStore()[1];
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorBoundary />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/login", element: <Login />, action: autenticateUser },
        {
          path: "/register",
          element: <RegisterPage />,
          action: registerUser,
        },
        {
          path: "/market",
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <MarketOverview />,
              loader: productsLoader,
              action: async ({ request }) => itemActions({ request, dispatch }),
            },
          ],
        },
        { path: "/logout", action: logoutUser }, // Add the logout route
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default RouterWrapper;
