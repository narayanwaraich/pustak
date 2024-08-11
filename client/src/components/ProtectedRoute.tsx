import { ChildrenProp } from "../types/services";
import { useAuth } from "../services/auth";
import { useLocation, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: ChildrenProp) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
