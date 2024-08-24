import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../../store/store";

const ProtectedRoute = () => {
  const { token } = useStore()[0];

  const isAllowed = !!token;

  if (isAllowed) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
export default ProtectedRoute;
