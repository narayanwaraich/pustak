import { ChildrenProp } from '../types/api';
import { useAuth } from '../lib/auth';
import { useLocation, Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: ChildrenProp) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};
