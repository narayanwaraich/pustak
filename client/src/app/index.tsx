import { useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppProvider } from './main-provider';
import { createRouter } from './routes';
import { queryClient } from '@/lib/react-query';

const AppRouter = () => {
  const router = useMemo(() => createRouter(queryClient), []);

  return <RouterProvider router={router} />;
};

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
