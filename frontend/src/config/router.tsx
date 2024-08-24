import {
  ActionFunctionArgs,
  createBrowserRouter,
  json,
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

export const router = createBrowserRouter([
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
        action: async ({ request }: ActionFunctionArgs) => {
          const data = await request.formData();
          const method = request.method;
          const url = `${process.env.REACT_APP_BASE_API_URL}/register`;

          const eventData = {
            username: data.get("username"),
            email: data.get("email"),
            password: data.get("password"),
            password_confirmation: data.get("password2"),
          };
          console.log(eventData);

          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
          });

          if (
            response.status === 401 ||
            response.status === 404 ||
            response.status === 400
          ) {
            return response;
          }

          if (!response.ok) {
            throw json(
              { message: "Could not comunicate with the server!" },
              { status: 500 },
            );
          }

          return response;
        },
      },
      {
        path: "/market",
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <MarketOverview />,
            loader: productsLoader,
            action: itemActions,
          },
        ],
      },
      { path: "/logout", action: logoutUser }, // Add the logout route
    ],
  },
]);
