import { createContext, useContext } from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { login } from './api/login';
import { useLocalStorage } from './localStorage';
import { ChildrenProp, UserCredentials, User } from '../types/api';

type Value = {
  user: User | null;
  onLogin: (credentials: UserCredentials) => Promise<void>;
  onLogout: () => void;
};

const AuthContext = createContext<Value | null>(null);

const AuthProvider = ({ children }: ChildrenProp) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useLocalStorage('user', null);

  const handleLogin = async (credentials: UserCredentials) => {
    const user = await login(credentials);

    if (user) {
      setUser(user);
      const origin = location.state?.from?.pathname || '/dashboard';
      navigate(origin);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const value = {
    user,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const ProtectedRoute = ({ children }: ChildrenProp) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) <Navigate to="/login" replace state={{ from: location }} />;
  return children;
};

export { AuthProvider, useAuth };
