import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAllowed = true }) => {
  if (isAllowed) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default ProtectedRoute;
