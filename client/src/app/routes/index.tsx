import { createBrowserRouter, Outlet } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { ProtectedRoute } from '@/lib/auth';
import { AppRoot } from './app/root';
import { topLevelFoldersLoader } from '@/features/Folders/api/get-top-level-folders';
import { bookmarksLoader } from '@/features/Bookmarks/api/get-bookmarks';
import { AuthProvider } from '@/lib/auth';

export const createRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      element: (
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      ),
      children: [
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
              loader: topLevelFoldersLoader(queryClient),
            },
            {
              path: ':bookmarkId',
              lazy: async () => {
                const { DashboardRoute } = await import('./app/dashboard');
                return { Component: DashboardRoute };
              },
              loader: ({ params }) =>
                bookmarksLoader(queryClient, params.bookmarkId),
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
      ],
    },
  ]);
