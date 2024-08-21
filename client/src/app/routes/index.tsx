import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@/lib/auth';
import { AppRoot } from './app/root';

export const createRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { LandingRoute } = await import('./landing');
        return { Component: LandingRoute };
      },
    },
    {
      path: '/register',
      lazy: async () => {
        const { RegisterForm } = await import(
          '@/features/Auth/components/register-form'
        );
        return { Component: RegisterForm };
      },
    },
    {
      path: '/login',
      lazy: async () => {
        const { LoginForm } = await import(
          '@/features/Auth/components/login-form'
        );
        return { Component: LoginForm };
      },
    },
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '',
          lazy: async () => {
            const { DashboardRoute } = await import('./app/dashboard');
            return { Component: DashboardRoute };
          },
        },
      ],
    },
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./not-found');
        return { Component: NotFoundRoute };
      },
    },
  ]);
