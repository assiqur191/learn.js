import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, authLoading } = useAuth();

  // Wait until the initial session check finishes.
  if (authLoading) {
    return <p className="p-6">Checking your session...</p>;
  }

  // If the user isn't logged in, redirect to login.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, display the requested protected page.
  return <Outlet />;
};

export default ProtectedRoute;
