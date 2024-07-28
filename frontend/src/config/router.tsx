import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../componets/layout/RootLayout";
import Login from "../componets/login/Login";
import ProtectedRoute from "../componets/protectedRoute/ProtectedRoute";
import ErrorBoundary from "../componets/views/ErrorBoudary";
import Home from "../pages/Home";
import MarketOverview, {
  loader as productsLoader,
} from "../pages/marketOverview/MarketOverview";
import RegisterPage from "../pages/registrPage/RegisterPage";
import { autenticateUser } from "../api/autenticateUser";
import { logoutUser } from "../api/logoutUser";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/login", element: <Login />, action: autenticateUser },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/market",
        element: <ProtectedRoute isAllowed={true} />,
        children: [
          { index: true, element: <MarketOverview />, loader: productsLoader },
        ],
      },
      { path: "/logout", action: logoutUser }, // Add the logout route
    ],
  },
]);
